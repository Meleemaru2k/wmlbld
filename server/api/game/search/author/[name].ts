import { getServerSession } from "#auth";
import PrismaDB from "~~/utils/prismaDB";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const prisma = PrismaDB.getClient();
  const email = session?.user?.email;

  if (!event.context.params?.name) {
    throw createError({
      statusCode: 500,
      statusMessage: "No search params given.",
    });
  }
  const username = decodeURIComponent(event.context.params.name);

  const games = await prisma.game
    .findMany({
      where: { author: { name: { contains: username } } },
      select: { passphrase: false },
      include: {
        eggs: true,
        author: { select: { name: true } },
        scores: email
          ? {
              where: { user: { email: email } },
            }
          : false,
        _count: { select: { scores: true } },
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
