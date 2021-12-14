import { PrismaClient } from '@prisma/client';

const client = new PrismaClient(); // Use Prisma Client to send queries to your database / use `client` in your application to read and write data in your DB

export default client;
