import { User } from "@prisma/client";
import PrismaDB from "~~/helper/prismaDB";
export default defineEventHandler(async (event) => {
  let response: User[] = [];
  let nameToFind = event.context.params.name;
  const prisma = PrismaDB.getClient();

  async function dbOps() {
    const users = await prisma.user.findMany({ where: { name: nameToFind } });
    return users;
  }

  await dbOps()
    .then(async (users) => {
      await prisma.$disconnect();
      response = users;
    })
    .catch(async (e) => {
      await prisma.$disconnect();
      throw e;
    });

  return response;
});
