import { sql } from "drizzle-orm";

import { db } from "./db";
import { execSync } from "child_process";
import path from "path";
import { individualDb } from "./schema";

const seedIndiv = [
  {
    id: 1,
    fullName: "Victor",
    email: "victor.oshimen@noun.edu.ng",
    phoneNumber: "75758585",
    songSelected: "What An Awesome God",
    day: "Day2"
  },
  {
    id: 2,
    fullName: "Vision",
    email: "vision.onyeaku@noun.edu.ng",
    phoneNumber: "75758585",
    songSelected: "What An Awesome God",
    day: "Day2"
  },
];

const pushDatabaseSchema = () => {
  // Get Git root in a cross-platform way
  const gitRoot = execSync("git rev-parse --show-toplevel").toString().trim();

  // Build the full path to the db package
  const dbPath = path.join(gitRoot, "packages", "db");

  // Run Drizzle push
  execSync(
    `bun --cwd "${dbPath}" drizzle-kit push --force --config=drizzle.config.ts`,
    {
      stdio: "inherit",
    }
  );
};

const seedDb = async () => {
  await db.execute(sql`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
  pushDatabaseSchema();

  await db.insert(individualDb).values(seedIndiv)
};

await seedDb();
