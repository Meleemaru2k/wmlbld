import PrismaDB from "~~/utils/prismaDB";

export default eventHandler(async (event) => {
  const prisma = PrismaDB.getClient();

  const games = await getGamesWithHighscores().finally(() =>
    prisma.$disconnect()
  );

  return games;

  /**
   *  Helper functions
   */
  async function getGamesWithHighscores() {
    const games = await prisma.game.findMany({
      orderBy: { id: "desc" },
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
    });
    return games;
  }
});
