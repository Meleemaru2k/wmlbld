import { getServerSession } from "#auth";
import PrismaDB from "~~/utils/prismaDB";

export default eventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: "unauthenticated!" };
  }
  const gameId = event.context.params.id;

  return { status: "authenticated!" };
});
