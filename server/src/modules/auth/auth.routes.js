import { registerSchema, loginSchema, forgotPasswordSchema } from './auth.schemas.js';
import { registerUser, loginUser, getMe, forgotPassword } from './auth.service.js';
import { buildJwtPayload } from '../../lib/jwt.js';

export default async function authRoutes(fastify) {
  // POST /api/auth/register
  fastify.post('/register', async (request, reply) => {
    const body = registerSchema.parse(request.body);
    const result = await registerUser(body);

    const token = fastify.jwt.sign(buildJwtPayload({
      userId: result.user.id,
      tenantId: result.tenantId,
      role: result.user.role,
      tenantSlug: result.tenantSlug,
    }));

    return reply.status(201).send({ token, user: result.user, tenantSlug: result.tenantSlug });
  });

  // POST /api/auth/login
  fastify.post('/login', {
    config: { rateLimit: { max: 10, timeWindow: '1 minute' } },
  }, async (request, reply) => {
    const body = loginSchema.parse(request.body);
    const result = await loginUser(body);

    const token = fastify.jwt.sign(buildJwtPayload({
      userId: result.user.id,
      tenantId: result.tenantId,
      role: result.user.role,
      tenantSlug: result.tenantSlug,
    }));

    return { token, user: result.user, tenantSlug: result.tenantSlug };
  });

  // GET /api/auth/me
  fastify.get('/me', { onRequest: [fastify.authenticate] }, async (request) => {
    return getMe(request.user.sub);
  });

  // POST /api/auth/forgot-password
  fastify.post('/forgot-password', async (request) => {
    const { email } = forgotPasswordSchema.parse(request.body);
    return forgotPassword(email);
  });

  // Placeholders
  fastify.post('/verify-email', async () => ({ ok: true, message: 'Verificação de email ainda não implementada' }));
  fastify.post('/resend-verification', async () => ({ ok: true, message: 'Reenvio ainda não implementado' }));
}
