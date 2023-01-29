import { getServerSession } from "#auth";
import PrismaDB from "~~/utils/prismaDB";

export default eventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session?.user?.email) {
    throw createError({
      statusCode: 500,
      statusMessage: "User not found - are you logged in?",
    });
  }

  const prisma = PrismaDB.getClient();

  let games;
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: { email: session?.user?.email },
      select: { id: true },
    });

    games = await prisma.game.findMany({
      where: { authorId: user.id },
      include: {
        eggs: true,
      },
    });
  } finally {
    await prisma.$disconnect();
  }

  return games;
});
