const pg = require('pg');
require('dotenv').config();
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
pool.query('ALTER TABLE notices ADD COLUMN file_data bytea;').then(() => console.log('Added file_data')).catch(console.error).finally(() => pool.end());
