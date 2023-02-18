import { getServerSession } from "#auth";
import { Egg, Game } from "@prisma/client";
import { GameWithEggs } from "~~/types/game";
import PrismaDB from "~~/utils/prismaDB";
import { GameValidator } from "~~/utils/validators/game";
import Jimp from "jimp";

export default eventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session || !session.user?.email) {
    throw createError({
      statusCode: 500,
      statusMessage: "User not found - are you logged in?",
    });
  }

  const {
    gameData,
  }: {
    gameData: GameWithEggs;
  } = await readBody(event);

  GameValidator.validateWithCleanups(gameData);

  const gameDataForCreate = {
    ...gameData,
    eggs: {
      create: gameData.eggs,
    },
  };

  const prisma = PrismaDB.getClient();
  const game = await addGame(gameDataForCreate, session.user.email)
    .catch((e) => {
      console.log(e);
      throw createError({
        statusCode: 500,
        statusMessage: "Gamedata seems to be faulty or game already exists.",
      });
    })
    .finally(async () => await prisma.$disconnect());

  /**
   * @TODO Add image to storage (probably azure blob storage?)
   */
  //await useStorage().setItem(
  //  `usercontent:gameimages:image_${game.id}`,
  //  game.image
  //);

  return { status: "Game Created: " + game.name };

  /**
   *  Helper functions
   */
  async function addGame(gameData: Game, email: string) {
    const user = await prisma.user.findFirstOrThrow({
      where: { email: email },
      select: { id: true },
    });

    //Dont let users create more than 3 games in total
    const gameCount = await prisma.game.count({
      where: { authorId: user.id },
    });

    if (gameCount >= 5) {
      throw createError({
        statusCode: 500,
        statusMessage: "You have reached the maximum amount of games.",
      });
    }

    //Create actual game
    gameData.authorId = user.id;
    return await prisma.game.create({ data: gameData });
  }
});
