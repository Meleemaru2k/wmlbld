import { getServerSession } from "#auth";
import PrismaDB from "~~/utils/prismaDB";

export default eventHandler(async (event) => {
  const session = await getServerSession(event);
  const email = session?.user?.email;
  if (!email) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const prisma = PrismaDB.getClient();

  const games = await getGamesWithHighscores(email).finally(() =>
    prisma.$disconnect()
  );

  return games;

  /**
   *  Helper functions
   */
  async function getGamesWithHighscores(email: string) {
    const games = await prisma.game
      .findMany({
        where: { scores: { some: { user: { email: email } } } },
        select: {
          name: true,
          image: true,
          eggs: true,
          author: { select: { name: true } },
          scores: {
            orderBy: { score: "desc" },
            take: 5,
            select: { score: true, user: { select: { name: true } } },
          },
        },
        take: 25,
      })
      .finally(() => prisma.$disconnect());
    return games;
  }
});
