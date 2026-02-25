import { z } from 'zod';
import { getTenantId } from '../tenants/tenants.service.js';
import {
  listAppointments, createAppointment, updateAppointment,
  patchAppointmentStatus, remindAppointment, depositInfo, mapLink
} from './appointments.service.js';

const createSchema = z.object({
  clientId: z.string().uuid(),
  barberId: z.string().uuid(),
  serviceId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  duration: z.number().int().positive().optional(),
  price: z.number().min(0).optional(),
  status: z.string().optional(),
  notes: z.string().optional(),
});

const patchSchema = z.object({
  status: z.enum(['PENDENTE','CONFIRMADO','PAGO','EM_DESLOCAMENTO','ATRASADO','FINALIZADO','CANCELADO','NO_SHOW']),
});

export default async function appointmentRoutes(fastify) {
  fastify.addHook('onRequest', fastify.authenticate);
  fastify.addHook('onRequest', fastify.enforceTenantAccess);

  fastify.get('/:tenantSlug/appointments', async (request) => {
    const tenantId = await getTenantId(request.params.tenantSlug);
    const { date } = request.query;
    return listAppointments(tenantId, date || null);
  });

  fastify.post('/:tenantSlug/appointments', async (request, reply) => {
    const tenantId = await getTenantId(request.params.tenantSlug);
    const body = createSchema.parse(request.body);
    const apt = await createAppointment(tenantId, body);
    return reply.status(201).send(apt);
  });

  fastify.put('/:tenantSlug/appointments/:id', async (request) => {
    const tenantId = await getTenantId(request.params.tenantSlug);
    return updateAppointment(tenantId, request.params.id, request.body);
  });

  fastify.patch('/:tenantSlug/appointments/:id', async (request) => {
    const tenantId = await getTenantId(request.params.tenantSlug);
    const { status } = patchSchema.parse(request.body);
    return patchAppointmentStatus(tenantId, request.params.id, status);
  });

  fastify.post('/:tenantSlug/appointments/:id/remind', async (request) => {
    const tenantId = await getTenantId(request.params.tenantSlug);
    return remindAppointment(tenantId, request.params.id);
  });

  fastify.post('/:tenantSlug/appointments/:id/deposit', async (request) => {
    const tenantId = await getTenantId(request.params.tenantSlug);
    return depositInfo(tenantId, request.params.id);
  });

  fastify.get('/:tenantSlug/appointments/:id/map-link', async (request) => {
    const tenantId = await getTenantId(request.params.tenantSlug);
    return mapLink(tenantId);
  });
}
