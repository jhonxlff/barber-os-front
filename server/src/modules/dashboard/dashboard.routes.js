import { getTenantId } from '../tenants/tenants.service.js';
import { getMetrics, getCharts } from './dashboard.service.js';

export default async function dashboardRoutes(fastify) {
  fastify.addHook('onRequest', fastify.authenticate);
  fastify.addHook('onRequest', fastify.enforceTenantAccess);

  fastify.get('/:tenantSlug/dashboard/metrics', async (request) => {
    const tenantId = await getTenantId(request.params.tenantSlug);
    return getMetrics(tenantId);
  });

  fastify.get('/:tenantSlug/dashboard/charts', async (request) => {
    const tenantId = await getTenantId(request.params.tenantSlug);
    const days = parseInt(request.query.days) || 60;
    const top = parseInt(request.query.top) || 5;
    return getCharts(tenantId, days, top);
  });
}
