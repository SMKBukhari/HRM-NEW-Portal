import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { createPool } from "mariadb";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;

  // Parse URL to ensure robust connection options
  // This fixes an issue where the driver might default to localhost with certain string formats
  // const url = new URL(
  //   connectionString?.replace("mysql://", "mariadb://") || ""
  // );

  // const pool = createPool({
  //   host: url.hostname,
  //   port: parseInt(url.port || "3306"),
  //   user: url.username,
  //   password: url.password,
  //   database: url.pathname.slice(1),
  //   connectionLimit: 10,
  //   connectTimeout: 20000, // 20 seconds
  //   acquireTimeout: 20000,
  // });

  // @ts-expect-error - Type mismatch between mariadb pool and adapter expectation
  const adapter = new PrismaMariaDb(connectionString);
  return new PrismaClient({ adapter });
};

export const db = globalThis.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
