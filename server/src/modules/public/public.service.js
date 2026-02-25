import { db } from '../../db/pool.js';
import { localDate, localTime, formatDate } from '../../lib/tz.js';

export async function getPublicTenant(tenantSlug) {
  const { rows } = await db.query(
    'SELECT slug, name, address, phone, logo FROM tenants WHERE slug = $1',
    [tenantSlug]
  );
  if (rows.length === 0) {
    const err = new Error('Estabelecimento não encontrado');
    err.statusCode = 404;
    throw err;
  }
  return rows[0];
}

export async function getPublicServices(tenantSlug) {
  const { rows } = await db.query(`
    SELECT s.id, s.name, s.price, s.duration, s.description
    FROM services s
    JOIN tenants t ON t.id = s.tenant_id
    WHERE t.slug = $1 AND s.active = true
    ORDER BY s.name
  `, [tenantSlug]);
  return rows.map(r => ({ ...r, price: Number(r.price), active: true }));
}

export async function getPublicTeam(tenantSlug) {
  const { rows } = await db.query(`
    SELECT b.id, b.name, b.avatar, b.working_hours
    FROM barbers b
    JOIN tenants t ON t.id = b.tenant_id
    WHERE t.slug = $1 AND b.active = true
    ORDER BY b.name
  `, [tenantSlug]);
  return rows.map(r => ({
    id: r.id,
    name: r.name,
    avatar: r.avatar,
    workingHours: r.working_hours || [],
  }));
}

export async function upsertClient(tenantSlug, data) {
  const { rows: [tenant] } = await db.query('SELECT id FROM tenants WHERE slug = $1', [tenantSlug]);
  if (!tenant) {
    const err = new Error('Tenant não encontrado');
    err.statusCode = 404;
    throw err;
  }

  const phone = (data.phone || '').replace(/\D/g, '');

  // Try to find by phone
  const { rows: existing } = await db.query(
    'SELECT id, name, phone, email FROM clients WHERE tenant_id = $1 AND phone = $2',
    [tenant.id, phone]
  );

  if (existing.length > 0) {
    // Update name/email if provided
    if (data.name || data.email) {
      await db.query(
        `UPDATE clients SET name = COALESCE($1, name), email = COALESCE($2, email) WHERE id = $3`,
        [data.name || null, data.email || null, existing[0].id]
      );
    }
    return { id: existing[0].id, name: data.name || existing[0].name, phone: existing[0].phone, email: data.email || existing[0].email };
  }

  // Create
  const { rows: [client] } = await db.query(
    `INSERT INTO clients (tenant_id, name, phone, email)
     VALUES ($1, $2, $3, $4) RETURNING id, name, phone, email`,
    [tenant.id, data.name, phone, data.email || null]
  );
  return client;
}

export async function createPublicAppointment(tenantSlug, data) {
  const { rows: [tenant] } = await db.query('SELECT id FROM tenants WHERE slug = $1', [tenantSlug]);
  if (!tenant) {
    const err = new Error('Tenant não encontrado');
    err.statusCode = 404;
    throw err;
  }

  const startAt = `${data.date} ${data.time}:00`;

  const { rows: [row] } = await db.query(`
    INSERT INTO appointments (tenant_id, client_id, barber_id, service_id, start_at, duration, price, status)
    VALUES ($1, $2, $3, $4, $5::timestamptz, $6, $7, 'CONFIRMADO'::appointment_status)
    RETURNING id
  `, [tenant.id, data.clientId, data.barberId, data.serviceId, startAt, data.duration || 30, data.price || 0]);

  // Return full object
  const { rows: [a] } = await db.query(`
    SELECT a.id, a.client_id, c.name as client_name, c.phone as client_phone,
           a.barber_id, b.name as barber_name, a.service_id, s.name as service_name,
           a.price, ${localDate()} as date, ${localTime()} as time,
           a.duration, a.status::text as status, a.notes
    FROM appointments a
    JOIN clients c ON c.id = a.client_id
    JOIN barbers b ON b.id = a.barber_id
    JOIN services s ON s.id = a.service_id
    WHERE a.id = $1
  `, [row.id]);

  return {
    id: a.id, clientId: a.client_id, clientName: a.client_name, clientPhone: a.client_phone || '',
    barberId: a.barber_id, barberName: a.barber_name, serviceId: a.service_id, serviceName: a.service_name,
    price: Number(a.price), date: a.date instanceof Date ? formatDate(a.date) : String(a.date),
    time: a.time, duration: a.duration, status: a.status, notes: a.notes || '',
  };
}
