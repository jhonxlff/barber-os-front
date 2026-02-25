// NavalhaPro — Error handler plugin
export default async function errorHandler(fastify) {
  fastify.setErrorHandler((error, request, reply) => {
    const statusCode = error.statusCode || 500;

    if (statusCode >= 500) {
      fastify.log.error(error);
    }

    // Zod validation errors
    if (error.name === 'ZodError') {
      return reply.status(400).send({
        message: 'Dados inválidos',
        code: 'VALIDATION_ERROR',
        details: error.issues?.map(i => ({ path: i.path.join('.'), message: i.message })),
      });
    }

    // Fastify validation errors
    if (error.validation) {
      return reply.status(400).send({
        message: 'Dados inválidos',
        code: 'VALIDATION_ERROR',
        details: error.validation,
      });
    }

    reply.status(statusCode).send({
      message: error.message || 'Erro interno do servidor',
      code: error.code || 'INTERNAL_ERROR',
    });
  });
}
