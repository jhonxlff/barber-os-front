// NavalhaPro — Auth decorator plugin
import { db } from '../db/pool.js';

export default async function authPlugin(fastify) {
  // Decorator to require authentication
  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send({ message: 'Token inválido ou expirado', code: 'UNAUTHORIZED' });
    }
  });

  // Decorator to enforce tenant access
  fastify.decorate('enforceTenantAccess', async (request, reply) => {
    const { tenantSlug } = request.params;
    const user = request.user;

    if (!tenantSlug) return;

    if (user.tenantSlug !== tenantSlug) {
      reply.status(403).send({ message: 'Acesso negado a este tenant', code: 'FORBIDDEN' });
    }
  });

  // Decorator to enforce roles
  fastify.decorate('enforceRoles', (...roles) => {
    return async (request, reply) => {
      if (!roles.includes(request.user.role)) {
        reply.status(403).send({ message: 'Permissão insuficiente', code: 'FORBIDDEN' });
      }
    };
  });
}
