import { PrismaClient } from '@prisma/client';

const client = new PrismaClient(); // prisma migrate dev 할때 client 하나가 만들어지긴 함. 여기서 client 초기화.
// Use Prisma Client to send queries to your database / use `client` in your application to read and write data in your DB

export default client;
