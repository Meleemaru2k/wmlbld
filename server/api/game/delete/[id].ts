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

  if (!event?.context?.params?.id) {
    throw createError({
      statusCode: 500,
      statusMessage: "Game id not found.",
    });
  }

  const gameId = parseInt(event.context.params.id);
  const prisma = PrismaDB.getClient();

  const user = await prisma.user
    .findFirstOrThrow({
      where: { email: session.user.email },
      select: { id: true },
    })
    .catch(() => {
      prisma.$disconnect();
      throw createError({
        statusCode: 500,
        statusMessage: "User doesnt have permisson to delete this game.",
      });
    });

  const gameToDelete = await prisma.game
    .findFirstOrThrow({
      where: { id: gameId, authorId: user.id },
      select: { id: true },
    })
    .catch(() => {
      prisma.$disconnect();
      throw createError({
        statusCode: 500,
        statusMessage:
          "User doesnt have permisson to delete this game or game wasn't found.",
      });
    });

  await prisma.egg
    .deleteMany({
      where: { gameId: gameToDelete.id },
    })
    .catch(() => {
      prisma.$disconnect();
      throw createError({
        statusCode: 500,
        statusMessage: "Error deleting game eggs.",
      });
    });

  await prisma.gameUserScore
    .deleteMany({
      where: { gameId: gameToDelete.id },
    })
    .catch(() => {
      prisma.$disconnect();
      throw createError({
        statusCode: 500,
        statusMessage: "Error deleting game highscores.",
      });
    });

  await prisma.game
    .delete({
      where: { id: gameToDelete.id },
      include: { eggs: true },
    })
    .catch(() => {
      prisma.$disconnect();
      throw createError({
        statusCode: 500,
        statusMessage: "Error deleting game.",
      });
    });

  await useStorage().removeItem(
    `usercontent:gameimages:image_${gameToDelete.id}`
  );
  prisma.$disconnect();

  return {
    statusCode: 200,
    statusMessage: "Game deleted",
  };
});
