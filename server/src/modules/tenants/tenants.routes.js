import { getTenant, getTenantId, getServices, getTeam } from './tenants.service.js';

export default async function tenantRoutes(fastify) {
  // All routes require auth + tenant access
  fastify.addHook('onRequest', fastify.authenticate);
  fastify.addHook('onRequest', fastify.enforceTenantAccess);

  // GET /api/tenants/:tenantSlug
  fastify.get('/:tenantSlug', async (request) => {
    return getTenant(request.params.tenantSlug);
  });

  // GET /api/tenants/:tenantSlug/services
  fastify.get('/:tenantSlug/services', async (request) => {
    const tenantId = await getTenantId(request.params.tenantSlug);
    return getServices(tenantId);
  });

  // GET /api/tenants/:tenantSlug/team
  fastify.get('/:tenantSlug/team', async (request) => {
    const tenantId = await getTenantId(request.params.tenantSlug);
    return getTeam(tenantId);
  });
}
