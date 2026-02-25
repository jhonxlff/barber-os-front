import { db } from '../../db/pool.js';
import { formatDate } from '../../lib/tz.js';

export async function listClients(tenantId) {
  const { rows } = await db.query(`
    SELECT c.id, c.name, c.phone, c.email, c.avatar, c.notes, c.created_at,
      COALESCE(
        to_char(MAX(a.start_at) FILTER (WHERE a.status::text = 'FINALIZADO'), 'YYYY-MM-DD'),
        '-'
      ) as last_visit,
      COUNT(a.id) FILTER (WHERE a.status::text = 'FINALIZADO') as total_visits,
      COALESCE(SUM(a.price) FILTER (WHERE a.status::text IN ('FINALIZADO','PAGO')), 0) as total_spent
    FROM clients c
    LEFT JOIN appointments a ON a.client_id = c.id AND a.tenant_id = c.tenant_id
    WHERE c.tenant_id = $1
    GROUP BY c.id
    ORDER BY c.name
  `, [tenantId]);

  return rows.map(r => {
    const visits = parseInt(r.total_visits) || 0;
    const totalSpent = Number(r.total_spent);
    const loyaltyPoints = visits;
    let loyaltyLevel = 'Bronze';
    if (loyaltyPoints >= 50) loyaltyLevel = 'Diamante';
    else if (loyaltyPoints >= 25) loyaltyLevel = 'Ouro';
    else if (loyaltyPoints >= 10) loyaltyLevel = 'Prata';

    return {
      id: r.id,
      name: r.name,
      phone: r.phone || '',
      email: r.email || '',
      avatar: r.avatar,
      lastVisit: r.last_visit,
      averageFrequency: visits > 1 ? Math.round(30 / (visits / 3)) : 0,
      totalSpent,
      loyaltyPoints,
      loyaltyLevel,
      notes: r.notes || '',
      createdAt: formatDate(r.created_at),
    };
  });
}

export async function getClient(tenantId, clientId) {
  const clients = await listClients(tenantId);
  const client = clients.find(c => c.id === clientId);
  if (!client) {
    const err = new Error('Cliente não encontrado');
    err.statusCode = 404;
    throw err;
  }
  return client;
}

export async function createClient(tenantId, data) {
  const { rows: [client] } = await db.query(
    `INSERT INTO clients (tenant_id, name, phone, email, notes)
     VALUES ($1, $2, $3, $4, $5) RETURNING id, name, phone, email, created_at`,
    [tenantId, data.name, data.phone || null, data.email || null, data.notes || null]
  );
  return {
    id: client.id,
    name: client.name,
    phone: client.phone || '',
    email: client.email || '',
    avatar: null,
    lastVisit: '-',
    averageFrequency: 0,
    totalSpent: 0,
    loyaltyPoints: 0,
    loyaltyLevel: 'Bronze',
    notes: '',
    createdAt: formatDate(client.created_at),
  };
}

export async function updateClient(tenantId, clientId, data) {
  const fields = [];
  const values = [];
  let idx = 1;

  for (const [key, val] of Object.entries(data)) {
    if (['name', 'phone', 'email', 'notes', 'avatar'].includes(key)) {
      fields.push(`${key} = $${idx}`);
      values.push(val);
      idx++;
    }
  }

  if (fields.length === 0) {
    const err = new Error('Nenhum campo para atualizar');
    err.statusCode = 400;
    throw err;
  }

  values.push(clientId, tenantId);
  await db.query(
    `UPDATE clients SET ${fields.join(', ')} WHERE id = $${idx} AND tenant_id = $${idx + 1}`,
    values
  );

  return getClient(tenantId, clientId);
}
