// JWT helpers — used by auth plugin and auth service
// The actual sign/verify is handled by @fastify/jwt plugin on the fastify instance.
// This file provides the payload shape helper.

/** @param {{ userId: string, tenantId: string, role: string, tenantSlug: string }} payload */
export const buildJwtPayload = ({ userId, tenantId, role, tenantSlug }) => ({
  sub: userId,
  tenantId,
  role,
  tenantSlug,
});
