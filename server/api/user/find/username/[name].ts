import { User } from "@prisma/client";
import PrismaDB from "~~/utils/prismaDB";
export default defineEventHandler(async (event) => {
  let response: Array<Partial<User>> = [];
  let nameToFind = event.context.params.name;
  const prisma = PrismaDB.getClient();

  async function dbOps() {
    const users = await prisma.user.findMany({
      where: { name: nameToFind },
      select: { id: true, name: true },
    });
    return users;
  }

  await dbOps()
    .then(async (users) => {
      await prisma.$disconnect();
      response = users;
    })
    .catch(async (e) => {
      await prisma.$disconnect();
      throw createError(e);
    });

  return response;
});
