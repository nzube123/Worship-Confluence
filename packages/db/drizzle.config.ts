import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/schema/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_2u8irqWHnpxd@ep-rapid-cell-amugpo8y-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require",
  },
}); 