import { z } from 'zod';
import {
  getPublicTenant, getPublicServices, getPublicTeam,
  upsertClient, createPublicAppointment
} from './public.service.js';

const upsertSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal('')),
});

const appointmentSchema = z.object({
  clientId: z.string().uuid(),
  barberId: z.string().uuid(),
  serviceId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  duration: z.number().int().positive().optional(),
  price: z.number().min(0).optional(),
});

export default async function publicRoutes(fastify) {
  fastify.get('/tenants/:tenantSlug', async (request) => {
    return getPublicTenant(request.params.tenantSlug);
  });

  fastify.get('/tenants/:tenantSlug/services', async (request) => {
    return getPublicServices(request.params.tenantSlug);
  });

  fastify.get('/tenants/:tenantSlug/team', async (request) => {
    return getPublicTeam(request.params.tenantSlug);
  });

  fastify.post('/tenants/:tenantSlug/clients/upsert', async (request, reply) => {
    const body = upsertSchema.parse(request.body);
    const client = await upsertClient(request.params.tenantSlug, body);
    return reply.status(201).send(client);
  });

  fastify.post('/tenants/:tenantSlug/appointments', async (request, reply) => {
    const body = appointmentSchema.parse(request.body);
    const apt = await createPublicAppointment(request.params.tenantSlug, body);
    return reply.status(201).send(apt);
  });
}
