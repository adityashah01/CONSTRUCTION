import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './db/schema'

let pool: any;
let db: any;

function createDeepMock(): any {
  const noop = () => createDeepMock();
  return new Proxy(noop, {
    get: (target, prop) => {
      if (prop === 'then') {
        return (resolve: any) => resolve([]);
      }
      return createDeepMock();
    },
    apply: () => createDeepMock()
  });
}

if (!process.env.DATABASE_URL || process.env.DATABASE_URL === '') {
  console.warn('[AI Studio] Database not connected — using mock');
  pool = { query: async () => ({ rows: [] }), connect: async () => ({ query: async () => ({ rows: [] }), release: () => {} }), on: () => {} };
  db = createDeepMock();
} else {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
}

export { pool, db };
