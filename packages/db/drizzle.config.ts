import { defineConfig } from "drizzle-kit";
export default defineConfig({
    schema: "./src/schema/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://postgres:postgres@localhost:5432/worship_confluence",
    },
}) 