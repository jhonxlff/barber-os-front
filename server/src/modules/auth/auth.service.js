import { db } from '../../db/pool.js';
import { hashPassword, comparePassword } from '../../lib/password.js';
import { redis } from '../../lib/redis.js';
import { sendEmail } from '../../lib/email.js';
import { config } from '../../config.js';

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function registerUser({ name, email, password, tenantName }) {
  const existing = await db.query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    const err = new Error('Email já cadastrado');
    err.statusCode = 409;
    throw err;
  }

  const client = await db.getClient();
  try {
    await client.query('BEGIN');

    const tName = tenantName || `Barbearia de ${name.split(' ')[0]}`;
    let slug = slugify(tName);

    // Ensure unique slug
    const { rows: slugCheck } = await client.query('SELECT id FROM tenants WHERE slug = $1', [slug]);
    if (slugCheck.length > 0) slug = `${slug}-${Date.now().toString(36)}`;

    const { rows: [tenant] } = await client.query(
      'INSERT INTO tenants (slug, name) VALUES ($1, $2) RETURNING id, slug, name',
      [slug, tName]
    );

    const hash = await hashPassword(password);
    const { rows: [user] } = await client.query(
      `INSERT INTO users (tenant_id, name, email, password_hash, role)
       VALUES ($1, $2, $3, $4, 'OWNER') RETURNING id, name, email, role`,
      [tenant.id, name, email, hash]
    );

    // Create barber entry for owner
    await client.query(
      `INSERT INTO barbers (tenant_id, user_id, name, email, role, commission_rate, active)
       VALUES ($1, $2, $3, $4, 'OWNER', 100, true)`,
      [tenant.id, user.id, name, email]
    );

    await client.query('COMMIT');

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role, tenantId: tenant.slug },
      tenantSlug: tenant.slug,
      tenantId: tenant.id,
    };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function loginUser({ email, password }) {
  const { rows } = await db.query(
    `SELECT u.id, u.name, u.email, u.role, u.password_hash, u.tenant_id, t.slug as tenant_slug
     FROM users u JOIN tenants t ON t.id = u.tenant_id
     WHERE u.email = $1`,
    [email]
  );

  if (rows.length === 0) {
    const err = new Error('Credenciais inválidas');
    err.statusCode = 401;
    throw err;
  }

  const user = rows[0];
  const valid = await comparePassword(password, user.password_hash);
  if (!valid) {
    const err = new Error('Credenciais inválidas');
    err.statusCode = 401;
    throw err;
  }

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role, tenantId: user.tenant_slug },
    tenantSlug: user.tenant_slug,
    tenantId: user.tenant_id,
  };
}

export async function getMe(userId) {
  const { rows } = await db.query(
    `SELECT u.id, u.name, u.email, u.role, u.avatar, t.slug as tenant_slug
     FROM users u JOIN tenants t ON t.id = u.tenant_id
     WHERE u.id = $1`,
    [userId]
  );
  if (rows.length === 0) {
    const err = new Error('Usuário não encontrado');
    err.statusCode = 404;
    throw err;
  }
  const u = rows[0];
  return { id: u.id, name: u.name, email: u.email, role: u.role, avatar: u.avatar, tenantId: u.tenant_slug };
}

export async function forgotPassword(email) {
  const { rows } = await db.query('SELECT id, name FROM users WHERE email = $1', [email]);
  // Always return success (don't leak user existence)
  if (rows.length === 0) return { ok: true };

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const key = `otp:forgot:${email}`;

  try {
    await redis.set(key, otp, 'EX', config.otpTtlMinutes * 60);
  } catch {
    console.log(`[OTP] Redis unavailable, OTP for ${email}: ${otp}`);
  }

  await sendEmail({
    to: email,
    subject: 'NavalhaPro — Recuperação de senha',
    html: `<p>Olá ${rows[0].name},</p><p>Seu código de recuperação: <strong>${otp}</strong></p><p>Válido por ${config.otpTtlMinutes} minutos.</p>`,
  });

  return { ok: true };
}
