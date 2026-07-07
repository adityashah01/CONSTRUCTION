const pg = require('pg');
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
pool.query('insert into "visitors" ("id", "path", "visited_at") values (default, $1, $2)', ['/', new Date()]).then(console.log).catch(e => console.error(e.message));
