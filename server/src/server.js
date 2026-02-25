// NavalhaPro — Server entry point
import { buildApp } from './app.js';
import { config } from './config.js';
import { redis } from './lib/redis.js';

const start = async () => {
  try {
    await redis.connect();
    console.log('[Redis] Connected');
  } catch (err) {
    console.warn('[Redis] Could not connect, OTP features will be unavailable:', err.message);
  }

  const app = await buildApp();

  await app.listen({ port: config.port, host: '0.0.0.0' });
  console.log(`[NavalhaPro] API running on port ${config.port} (${config.nodeEnv})`);
};

start().catch((err) => {
  console.error('[NavalhaPro] Failed to start:', err);
  process.exit(1);
});
