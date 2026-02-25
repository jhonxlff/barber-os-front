// NavalhaPro — Environment configuration

const env = (key, fallback) => {
  const v = process.env[key];
  if (v !== undefined) return v;
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing required env var: ${key}`);
};

export const config = {
  nodeEnv: env('NODE_ENV', 'development'),
  port: parseInt(env('PORT', '3003'), 10),
  databaseUrl: env('DATABASE_URL', 'postgres://navalhapro:navalhapro@localhost:5432/navalhapro'),
  redisUrl: env('REDIS_URL', 'redis://localhost:6379'),
  jwtSecret: env('JWT_SECRET', 'dev-secret-change-me-in-production-32ch'),
  appBaseUrl: env('APP_BASE_URL', 'http://localhost:5173'),
  apiBaseUrl: env('API_BASE_URL', 'http://localhost:3003'),
  brevoApiKey: env('BREVO_API_KEY', ''),
  emailFrom: env('EMAIL_FROM', 'noreply@navalhapro.com'),
  emailFromName: env('EMAIL_FROM_NAME', 'NavalhaPro'),
  otpTtlMinutes: parseInt(env('OTP_TTL_MINUTES', '10'), 10),
  pixKey: env('PIX_KEY', ''),
  appTz: env('APP_TZ', 'America/Recife'),
};

if (config.nodeEnv === 'production' && config.jwtSecret.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters in production');
}
