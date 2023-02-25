import { User } from "@prisma/client";
import PrismaDB from "~~/utils/prismaDB";
export default defineEventHandler(async (event) => {
  let response: Partial<User> | null = null;
  let emailToFind = event.context?.params?.name;
  const prisma = PrismaDB.getClient();

  async function dbOps() {
    const user = await prisma.user.findFirst({
      where: { email: emailToFind },
      select: { id: true, name: true },
    });
    return user;
  }

  await dbOps()
    .then(async (user) => {
      await prisma.$disconnect();
      response = user;
    })
    .catch(async (e) => {
      await prisma.$disconnect();
      throw createError(e);
    });

  return response;
});
