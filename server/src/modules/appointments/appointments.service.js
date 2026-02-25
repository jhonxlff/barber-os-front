import { db } from '../../db/pool.js';
import { localDate, localTime, todayExpr, formatDate } from '../../lib/tz.js';
import { config } from '../../config.js';

export async function listAppointments(tenantId, date) {
  const dateFilter = date
    ? `AND ${localDate()} = $2::date`
    : '';
  const params = date ? [tenantId, date] : [tenantId];

  const { rows } = await db.query(`
    SELECT a.id, a.client_id, c.name as client_name, c.phone as client_phone,
           a.barber_id, b.name as barber_name,
           a.service_id, s.name as service_name,
           a.price, ${localDate()} as date, ${localTime()} as time,
           a.duration, a.status::text as status, a.notes
    FROM appointments a
    JOIN clients c ON c.id = a.client_id
    JOIN barbers b ON b.id = a.barber_id
    JOIN services s ON s.id = a.service_id
    WHERE a.tenant_id = $1 ${dateFilter}
    ORDER BY a.start_at ASC
  `, params);

  return rows.map(r => ({
    id: r.id,
    clientId: r.client_id,
    clientName: r.client_name,
    clientPhone: r.client_phone || '',
    barberId: r.barber_id,
    barberName: r.barber_name,
    serviceId: r.service_id,
    serviceName: r.service_name,
    price: Number(r.price),
    date: r.date instanceof Date ? formatDate(r.date) : String(r.date),
    time: r.time,
    duration: r.duration,
    status: r.status,
    notes: r.notes || '',
  }));
}

export async function createAppointment(tenantId, data) {
  const startAt = `${data.date} ${data.time}:00`;

  // Check barber conflict (fixed: no alias prefix on unambiguous table)
  const { rows: conflicts } = await db.query(`
    SELECT id FROM appointments
    WHERE barber_id = $1
      AND tenant_id = $2
      AND status::text NOT IN ('CANCELADO', 'NO_SHOW')
      AND start_at < ($3::timestamptz + ($4 || ' minutes')::interval)
      AND (start_at + (duration || ' minutes')::interval) > $3::timestamptz
  `, [data.barberId, tenantId, startAt, String(data.duration || 30)]);

  if (conflicts.length > 0) {
    const err = new Error('Barbeiro já possui agendamento neste horário');
    err.statusCode = 409;
    throw err;
  }

  const { rows: [row] } = await db.query(`
    INSERT INTO appointments (tenant_id, client_id, barber_id, service_id, start_at, duration, price, status, notes)
    VALUES ($1, $2, $3, $4, $5::timestamptz, $6, $7, $8::appointment_status, $9)
    RETURNING id
  `, [
    tenantId, data.clientId, data.barberId, data.serviceId,
    startAt, data.duration || 30, data.price || 0,
    data.status || 'PENDENTE', data.notes || null,
  ]);

  const list = await listAppointments(tenantId, data.date);
  return list.find(a => a.id === row.id);
}

export async function updateAppointment(tenantId, appointmentId, data) {
  const fields = [];
  const values = [];
  let idx = 1;

  if (data.date && data.time) {
    fields.push(`start_at = $${idx}::timestamptz`);
    values.push(`${data.date} ${data.time}:00`);
    idx++;
  }
  for (const [key, col] of [['clientId','client_id'],['barberId','barber_id'],['serviceId','service_id'],['duration','duration'],['notes','notes']]) {
    if (data[key] !== undefined) {
      fields.push(`${col} = $${idx}`);
      values.push(data[key]);
      idx++;
    }
  }
  if (data.price !== undefined) {
    fields.push(`price = $${idx}`);
    values.push(data.price);
    idx++;
  }
  if (data.status) {
    fields.push(`status = $${idx}::appointment_status`);
    values.push(data.status);
    idx++;
  }

  if (fields.length === 0) {
    const err = new Error('Nenhum campo para atualizar');
    err.statusCode = 400;
    throw err;
  }

  values.push(appointmentId, tenantId);
  await db.query(
    `UPDATE appointments SET ${fields.join(', ')} WHERE id = $${idx} AND tenant_id = $${idx + 1}`,
    values
  );

  const { rows } = await db.query(`
    SELECT a.id, a.client_id, c.name as client_name, c.phone as client_phone,
           a.barber_id, b.name as barber_name, a.service_id, s.name as service_name,
           a.price, ${localDate()} as date, ${localTime()} as time,
           a.duration, a.status::text as status, a.notes
    FROM appointments a
    JOIN clients c ON c.id = a.client_id
    JOIN barbers b ON b.id = a.barber_id
    JOIN services s ON s.id = a.service_id
    WHERE a.id = $1 AND a.tenant_id = $2
  `, [appointmentId, tenantId]);

  if (rows.length === 0) {
    const err = new Error('Agendamento não encontrado');
    err.statusCode = 404;
    throw err;
  }

  const r = rows[0];
  return {
    id: r.id, clientId: r.client_id, clientName: r.client_name, clientPhone: r.client_phone || '',
    barberId: r.barber_id, barberName: r.barber_name, serviceId: r.service_id, serviceName: r.service_name,
    price: Number(r.price), date: r.date instanceof Date ? formatDate(r.date) : String(r.date),
    time: r.time, duration: r.duration, status: r.status, notes: r.notes || '',
  };
}

export async function patchAppointmentStatus(tenantId, appointmentId, status) {
  await db.query(
    `UPDATE appointments SET status = $1::appointment_status WHERE id = $2 AND tenant_id = $3`,
    [status, appointmentId, tenantId]
  );
  return { ok: true, status };
}

export async function remindAppointment(tenantId, appointmentId) {
  const { rows } = await db.query(`
    SELECT a.id, c.name, c.email, s.name as service_name,
           ${localDate()} as date, ${localTime()} as time
    FROM appointments a
    JOIN clients c ON c.id = a.client_id
    JOIN services s ON s.id = a.service_id
    WHERE a.id = $1 AND a.tenant_id = $2
  `, [appointmentId, tenantId]);

  if (rows.length === 0) {
    const err = new Error('Agendamento não encontrado');
    err.statusCode = 404;
    throw err;
  }

  const apt = rows[0];
  if (apt.email) {
    const { sendEmail } = await import('../../lib/email.js');
    await sendEmail({
      to: apt.email,
      subject: 'Lembrete de agendamento — NavalhaPro',
      html: `<p>Olá ${apt.name}, seu agendamento de <strong>${apt.service_name}</strong> está marcado para ${apt.date} às ${apt.time}.</p>`,
    });
  } else {
    console.log(`[Remind] Client ${apt.name} has no email, skipping.`);
  }

  return { ok: true };
}

export async function depositInfo(tenantId, appointmentId) {
  if (!config.pixKey) {
    const err = new Error('PIX_KEY não configurada no servidor');
    err.statusCode = 500;
    throw err;
  }

  const { rows } = await db.query(
    'SELECT price FROM appointments WHERE id = $1 AND tenant_id = $2',
    [appointmentId, tenantId]
  );
  if (rows.length === 0) {
    const err = new Error('Agendamento não encontrado');
    err.statusCode = 404;
    throw err;
  }

  const amount = Number(rows[0].price) * 0.3;
  const masked = config.pixKey.slice(0, 4) + '****' + config.pixKey.slice(-4);

  return { ok: true, amount: Math.round(amount * 100) / 100, pixKeyMasked: masked };
}

export async function mapLink(tenantId) {
  const { rows } = await db.query('SELECT name, address FROM tenants WHERE id = $1', [tenantId]);
  const t = rows[0];
  const query = encodeURIComponent(t?.address || `Barbearia ${t?.name || ''}`);
  return { ok: true, url: `https://www.google.com/maps/search/?api=1&query=${query}` };
}
