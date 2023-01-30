import { getServerSession } from "#auth";
import { Egg, Game } from "@prisma/client";
import PrismaDB from "~~/utils/prismaDB";

function randomIntFromInterval(min: number = 100000, max: number = 999999) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const forbiddenGameNames = [
  "create",
  "update",
  "delete",
  "get",
  "list",
  "newest",
  "new",
];

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
    gameData: Game & { eggs: Array<Partial<Egg>> };
  } = await readBody(event);

  /**
   * Some validation/sanitization and corrections are necessary
   */

  if (
    gameData.image &&
    gameData.image.length > 0 &&
    !gameData.image.match(/^data:image\/(png|jpg|jpeg);base64,/)
  ) {
    throw createError({
      statusCode: 500,
      statusMessage: "Image is not in base64 format.",
    });
  }
  if (gameData.description && gameData.description?.length > 254) {
    gameData.description = gameData.description.slice(0, 254);
  }
  if (gameData.name && gameData.name.length > 254) {
    gameData.name = gameData.name.slice(0, 254);
  }
  if (forbiddenGameNames.includes(gameData.name)) {
    gameData.name = gameData.name + randomIntFromInterval();
  }

  const gameDataForCreate = {
    ...gameData,
    eggs: {
      create: gameData.eggs.map((egg: any) => {
        if (egg.hint && egg.hint.length > 254) {
          egg.hint = egg.hint.slice(0, 254);
        }
        if (egg.description && egg.description.length > 254) {
          egg.description = egg.description.slice(0, 254);
        }
        delete egg.gameId;
        delete egg.id;
        egg.pos_x =
          egg.pos_x === typeof "number" ? egg.pos_x : parseInt(egg.pos_x);
        egg.pos_y =
          egg.pos_y === typeof "number" ? egg.pos_y : parseInt(egg.pos_y);
        egg.size = egg.size === typeof "number" ? egg.size : parseInt(egg.size);
        return egg;
      }),
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

    if (gameCount >= 3) {
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
