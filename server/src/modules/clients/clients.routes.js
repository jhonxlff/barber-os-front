import { z } from 'zod';
import { getTenantId } from '../tenants/tenants.service.js';
import { listClients, getClient, createClient, updateClient } from './clients.service.js';

const clientBodySchema = z.object({
  name: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  notes: z.string().optional(),
  avatar: z.string().optional(),
});

export default async function clientRoutes(fastify) {
  fastify.addHook('onRequest', fastify.authenticate);
  fastify.addHook('onRequest', fastify.enforceTenantAccess);

  fastify.get('/:tenantSlug/clients', async (request) => {
    const tenantId = await getTenantId(request.params.tenantSlug);
    return listClients(tenantId);
  });

  fastify.get('/:tenantSlug/clients/:id', async (request) => {
    const tenantId = await getTenantId(request.params.tenantSlug);
    return getClient(tenantId, request.params.id);
  });

  fastify.post('/:tenantSlug/clients', async (request, reply) => {
    const tenantId = await getTenantId(request.params.tenantSlug);
    const body = clientBodySchema.parse(request.body);
    const client = await createClient(tenantId, body);
    return reply.status(201).send(client);
  });

  fastify.put('/:tenantSlug/clients/:id', async (request) => {
    const tenantId = await getTenantId(request.params.tenantSlug);
    const body = clientBodySchema.partial().parse(request.body);
    return updateClient(tenantId, request.params.id, body);
  });
}
