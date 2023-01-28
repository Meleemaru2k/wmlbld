import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session || !session.user?.email) {
    throw createError({
      statusCode: 500,
      statusMessage: "User not found - are you logged in?",
    });
  }

  const prisma = prismaDB.getClient();
  const games = await prisma.game.findMany({
    where: { author: { email: session.user.email } },
  });

  return games;
});
