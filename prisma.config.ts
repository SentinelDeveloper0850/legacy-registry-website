import "dotenv/config";
import type { PrismaConfig } from "prisma";
import { defineConfig, env } from "prisma/config";

const isMigration = process.argv.some(arg => arg.includes("migrate"));

export default {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: isMigration ? env("DIRECT_URL") : env("DATABASE_URL"),
  },
} satisfies PrismaConfig;
