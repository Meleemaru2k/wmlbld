import { getServerSession } from "#auth";
import { Egg, Game } from "@prisma/client";
import PrismaDB from "~~/helper/prismaDB";

export default eventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session || !session.user?.email) {
    return { status: "User not found - are you logged in?" };
  }

  const { gameData }: { gameData: Game & { eggs: Array<Egg> } } =
    await readBody(event);

  const prisma = PrismaDB.getClient();
  async function addGame(gameData: Game, email: string) {
    const user = await prisma.user.findFirstOrThrow({
      where: { email: email },
      select: { id: true },
    });
    gameData.authorId = user.id;
    return await prisma.game.create({ data: gameData });
  }

  const gameDataForCreate = { ...gameData, eggs: { create: gameData.eggs } };
  const game = await addGame(gameDataForCreate, session.user.email).finally(
    async () => await prisma.$disconnect()
  );

  return { status: "Game Created: " + game.name };
});
