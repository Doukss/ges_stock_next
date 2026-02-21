import { PrismaClient } from "@prisma/client/extension";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalthis: {
  prismaGlobal : ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalthis.prismaGlobal ?? prismaClientSingleton()

export default prisma;

if (process.env.NODE_ENV !== "production") globalthis.prismaGlobal = prisma;
