import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();
export const db = prisma;
