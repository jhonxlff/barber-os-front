// NavalhaPro — Migration runner
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));
const migrationsDir = join(__dirname, '..', 'migrations');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://navalhapro:navalhapro@localhost:5432/navalhapro';

async function migrate() {
  const client = new pg.Client({ connectionString: DATABASE_URL });
  await client.connect();

  // Ensure migrations table exists
  await client.query(`
    CREATE TABLE IF NOT EXISTS migrations_applied (
      name TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ DEFAULT now()
    )
  `);

  const { rows: applied } = await client.query('SELECT name FROM migrations_applied ORDER BY name');
  const appliedSet = new Set(applied.map(r => r.name));

  const files = readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    if (appliedSet.has(file)) {
      console.log(`[migrate] ✓ ${file} (already applied)`);
      continue;
    }

    console.log(`[migrate] Applying ${file}...`);
    const sql = readFileSync(join(migrationsDir, file), 'utf8');
    try {
      await client.query(sql);
      await client.query('INSERT INTO migrations_applied (name) VALUES ($1)', [file]);
      console.log(`[migrate] ✓ ${file} applied`);
    } catch (err) {
      console.error(`[migrate] ✗ ${file} failed:`, err.message);
      process.exit(1);
    }
  }

  await client.end();
  console.log('[migrate] All migrations applied.');
}

migrate().catch(err => {
  console.error('[migrate] Fatal:', err);
  process.exit(1);
});
