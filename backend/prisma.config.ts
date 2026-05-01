import { configDotenv } from "dotenv";
import { defineConfig, env } from "prisma/config";

configDotenv()

// console.log(process.env)

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  }, 
});