// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { createPool } from "mariadb";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;

  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10,
  });
  return new PrismaClient({ adapter });
};

export const db = globalThis.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
