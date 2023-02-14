import { getServerSession } from "#auth";
import PrismaDB from "~~/utils/prismaDB";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const prisma = PrismaDB.getClient();
  const email = session?.user?.email;

  /**
   * @todo: Select score doesn't work on scores somehow
   */

  const games = await prisma.game
    .findMany({
      include: {
        eggs: true,
        author: { select: { name: true } },
        scores: email
          ? {
              where: { user: { email: email } },
            }
          : false,
      },
      take: 25,
    })
    .finally(() => prisma.$disconnect());

  if (!games) {
    throw createError({
      statusCode: 404,
      statusMessage: "No Games Found",
    });
  }

  return games;
});
