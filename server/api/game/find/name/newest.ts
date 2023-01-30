import PrismaDB from "~~/utils/prismaDB";

export default defineEventHandler(async (event) => {
  const gameName = event.context.params.name;
  const prisma = PrismaDB.getClient();

  const games = await prisma.game
    .findMany({
      where: {
        name: gameName,
      },
      include: {
        eggs: true,
      },
      take: 25,
    })
    .finally(() => prisma.$disconnect());

  if (!games) {
    throw createError({
      statusCode: 404,
      statusMessage: "No Games Found",
    });
  } else {
    return games;
  }
});
