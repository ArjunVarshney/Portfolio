// @ts-nocheck
import { PrismaClient } from "./generated/prisma";

declare global {
   let db: PrismaClient | undefined;
}

const db = globalThis.db || new PrismaClient({ errorFormat: "pretty" });
if (process.env.NODE_ENV !== "production") globalThis.db = db;

export default db;
