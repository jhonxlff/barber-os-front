import { db } from '../../db/pool.js';

export async function getTenant(tenantSlug) {
  const { rows } = await db.query(
    'SELECT id, slug, name, address, phone, logo FROM tenants WHERE slug = $1',
    [tenantSlug]
  );
  if (rows.length === 0) {
    const err = new Error('Tenant não encontrado');
    err.statusCode = 404;
    throw err;
  }
  return rows[0];
}

export async function getTenantId(tenantSlug) {
  const { rows } = await db.query('SELECT id FROM tenants WHERE slug = $1', [tenantSlug]);
  if (rows.length === 0) {
    const err = new Error('Tenant não encontrado');
    err.statusCode = 404;
    throw err;
  }
  return rows[0].id;
}

export async function getServices(tenantId) {
  const { rows } = await db.query(
    `SELECT id, name, price, duration, description, active
     FROM services WHERE tenant_id = $1 AND active = true ORDER BY name`,
    [tenantId]
  );
  return rows.map(r => ({ ...r, price: Number(r.price) }));
}

export async function getTeam(tenantId) {
  const { rows } = await db.query(
    `SELECT id, name, email, phone, avatar, role, commission_rate, unit_id, working_hours, active
     FROM barbers WHERE tenant_id = $1 ORDER BY name`,
    [tenantId]
  );
  return rows.map(r => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    avatar: r.avatar,
    role: r.role,
    commissionRate: r.commission_rate,
    unitId: r.unit_id,
    workingHours: r.working_hours || [],
    active: r.active,
  }));
}
