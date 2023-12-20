import { PrismaClient } from "@prisma/client";

const _prisma = new PrismaClient();
export const prisma = () => _prisma