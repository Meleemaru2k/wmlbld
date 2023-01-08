import { User } from "@prisma/client";
import PrismaDB from "~~/helper/prismaDB";
export default defineEventHandler(async (event) => {
  let response: User | null = null;
  let emailToFind = event.context.params.name;
  const prisma = PrismaDB.getClient();

  async function dbOps() {
    const users = await prisma.user.findFirst({
      where: { email: emailToFind },
    });
    return users;
  }

  await dbOps()
    .then(async (user) => {
      await prisma.$disconnect();
      response = user;
    })
    .catch(async (e) => {
      await prisma.$disconnect();
      throw e;
    });

  return response;
});
