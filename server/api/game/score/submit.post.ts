import { getServerSession } from "#auth";
import PrismaDB from "~~/utils/prismaDB";

export default eventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session || !session.user?.email) {
    throw createError({
      statusCode: 500,
      statusMessage: "User not found - are you logged in?",
    });
  }

  const { gameId, score } = await readBody(event);

  const prisma = PrismaDB.getClient();
  const highscore = await addHighscore(gameId, session.user.email, score)
    .catch((e) => {
      console.log(e);
      throw createError({
        statusCode: 500,
        statusMessage: "Couldn't submit score.",
      });
    })
    .finally(async () => await prisma.$disconnect());

  return highscore;

  /**
   *  Helper functions
   */
  async function addHighscore(gameId: number, email: string, score: number) {
    const user = await prisma.user.findFirstOrThrow({
      where: { email: email },
      select: { id: true },
    });
    const game = await prisma.game.findFirstOrThrow({
      where: { id: gameId },
      select: { id: true },
    });
    const userScore = await prisma.gameUserScore.findFirst({
      where: { userId: user.id, gameId: game.id },
      select: { score: true },
    });

    if (userScore?.score && userScore?.score < score) {
      return { score: userScore.score };
    }
    return await prisma.gameUserScore.upsert({
      where: { userId_gameId: { userId: user.id, gameId: game.id } },
      update: { score: score },
      create: {
        user: { connect: { email: email } },
        game: { connect: { id: gameId } },
        score: score,
      },
    });
  }
});
