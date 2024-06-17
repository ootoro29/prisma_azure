import { pool } from "./db";
import { PrismaClient } from "@prisma/client";
//import { PrismaPg } from "@prisma/adapter-pg";


const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma || new PrismaClient();

//const adapter = new PrismaPg(pool);
//export const prisma = new PrismaClient({adapter});