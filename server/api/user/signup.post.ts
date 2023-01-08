import PrismaDB from "~~/helper/prismaDB";
export default defineEventHandler(async (event) => {
  let response = { status: "ok" };
  const body = (await readBody(event)) as {
    name: string;
    email: string;
    password: string;
  };

  if (!body.email || !body.name || !body.password) {
    throw createError({
      statusCode: 400,
      message: "Bitte alle benötigten Felder ausfüllen.",
    });
  }
  if (body.password.length < 10) {
    throw createError({
      statusCode: 400,
      message: "Password muss min. 10 Zeichen haben.",
    });
  }

  const prisma = PrismaDB.getClient();
  async function dbOps() {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    return user;
  }

  await dbOps()
    .then(async (user) => {
      await prisma.$disconnect();
      response = { status: "ok" };
    })
    .catch(async (e) => {
      await prisma.$disconnect();
      throw createError({
        statusCode: 400,
        message: "Nuzter existiert bereits",
      });
    });

  return response;
});
