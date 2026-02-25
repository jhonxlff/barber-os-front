import { config } from '../config.js';

export async function sendEmail({ to, subject, html }) {
  if (!config.brevoApiKey) {
    console.log(`[Email] (no BREVO_API_KEY) Would send to ${to}: ${subject}`);
    return { ok: true, simulated: true };
  }

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': config.brevoApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: config.emailFromName, email: config.emailFrom },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('[Email] Brevo error:', err);
    throw new Error('Failed to send email');
  }

  return { ok: true };
}
