import PrismaDB from "~~/utils/prismaDB";

export default defineEventHandler(async (event) => {
  if (!event.context.params?.name) {
    throw createError({
      statusCode: 500,
      statusMessage: "No search params given.",
    });
  }
  const gameName = decodeURIComponent(event.context.params.name);
  const prisma = PrismaDB.getClient();

  const game = await prisma.game.findFirst({
    where: {
      name: gameName,
    },
    include: {
      eggs: true,
    },
  });
  await prisma.$disconnect();

  if (!game) {
    throw createError({
      statusCode: 404,
      statusMessage: "Game not found.",
    });
  } else {
    return game;
  }
});
