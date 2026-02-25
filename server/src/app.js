// NavalhaPro — Fastify application setup
import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt';
import { config } from './config.js';
import errorHandler from './plugins/errorHandler.js';
import authPlugin from './plugins/auth.js';
import authRoutes from './modules/auth/auth.routes.js';
import tenantRoutes from './modules/tenants/tenants.routes.js';
import clientRoutes from './modules/clients/clients.routes.js';
import appointmentRoutes from './modules/appointments/appointments.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';
import publicRoutes from './modules/public/public.routes.js';

export async function buildApp() {
  const fastify = Fastify({
    logger: {
      level: config.nodeEnv === 'production' ? 'info' : 'debug',
    },
  });

  // CORS
  await fastify.register(cors, {
    origin: config.nodeEnv === 'production'
      ? [config.appBaseUrl]
      : true,
    credentials: true,
  });

  // Rate limit
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (req) => req.ip,
  });

  // JWT
  await fastify.register(jwt, {
    secret: config.jwtSecret,
    sign: { expiresIn: '7d' },
  });

  // Custom plugins
  await fastify.register(errorHandler);
  await fastify.register(authPlugin);

  // Routes — all prefixed with /api
  await fastify.register(authRoutes, { prefix: '/api/auth' });
  await fastify.register(tenantRoutes, { prefix: '/api/tenants' });
  await fastify.register(clientRoutes, { prefix: '/api/tenants' });
  await fastify.register(appointmentRoutes, { prefix: '/api/tenants' });
  await fastify.register(dashboardRoutes, { prefix: '/api/tenants' });
  await fastify.register(publicRoutes, { prefix: '/api/public' });

  // Health check
  fastify.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  return fastify;
}
