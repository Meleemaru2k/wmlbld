import PrismaDB from "~~/utils/prismaDB";

export default defineEventHandler(async (event) => {
  const prisma = PrismaDB.getClient();

  const games = await prisma.game
    .findMany({
      include: {
        eggs: true,
        author: { select: { name: true } },
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
