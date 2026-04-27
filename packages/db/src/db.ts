import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema/index.js";

let pool: Pool | null = null;

function getPool() {
  if (pool) return pool;

  const connectionString =
    "postgresql://neondb_owner:npg_2u8irqWHnpxd@ep-rapid-cell-amugpo8y-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require";
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is required to initialize the database client"
    );
  }

  pool = new Pool({ connectionString });
  return pool;
}

export const db = drizzle(getPool(), { schema });
export type DatabaseClient = typeof db;
