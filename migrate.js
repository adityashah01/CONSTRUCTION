const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.query(`
  ALTER TABLE visitors ADD COLUMN IF NOT EXISTS notice_id INTEGER;
  ALTER TABLE visitors ADD COLUMN IF NOT EXISTS user_id TEXT;
  ALTER TABLE visitors ADD COLUMN IF NOT EXISTS ip_address TEXT;
  ALTER TABLE visitors ADD COLUMN IF NOT EXISTS user_agent TEXT;
  ALTER TABLE visitors ADD COLUMN IF NOT EXISTS viewed_at TIMESTAMP NOT NULL DEFAULT NOW();
`).then(() => console.log('Migrated')).catch(console.error).finally(() => pool.end());
