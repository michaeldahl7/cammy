import { drizzle } from 'drizzle-orm/postgres-js';

import postgres from 'postgres';
import { env } from './env';
import * as schema from './schema/schema';

const driver = postgres(env.DATABASE_URL);
export const db = drizzle(driver, { schema });

// import { drizzle } from 'drizzle-orm/bun-sql';
// import * as schema from './schema/schema';
// import { env } from './env';
// export const db = drizzle(env.DATABASE_URL as string, {
//   schema: schema,
// });
