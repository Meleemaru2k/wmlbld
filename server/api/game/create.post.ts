import { getServerSession } from "#auth";
import { Egg, Game } from "@prisma/client";
import PrismaDB from "~~/helper/prismaDB";

export default eventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session || !session.user?.email) {
    throw createError({
      statusCode: 500,
      statusMessage: "User not found - are you logged in?",
    });
  }

  const { gameData }: { gameData: Game & { eggs: Array<Egg> } } =
    await readBody(event);

  const prisma = PrismaDB.getClient();
  const gameDataForCreate = { ...gameData, eggs: { create: gameData.eggs } };

  async function addGame(gameData: Game, email: string) {
    const user = await prisma.user.findFirstOrThrow({
      where: { email: email },
      select: { id: true },
    });
    gameData.authorId = user.id;
    return await prisma.game.create({ data: gameData });
  }

  const game = await addGame(gameDataForCreate, session.user.email)
    .catch((e) => {
      throw createError({
        statusCode: 500,
        statusMessage: "Gamedata seems to be faulty.",
        stack: e,
      });
    })
    .finally(async () => await prisma.$disconnect());

  return { status: "Game Created: " + game.name };
});
