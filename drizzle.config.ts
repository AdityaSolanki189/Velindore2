import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/backend/db/schema.ts',
  out: './src/backend/db/migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  },
} satisfies Config;
