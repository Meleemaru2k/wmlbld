import PrismaDB from "~~/utils/prismaDB";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  let response = { status: "Initial" };
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

  await bcrypt.hash(body.password, 10).then(async (hash: string) => {
    await dbOps(hash)
      .then(async (user) => {
        await prisma.$disconnect();
        response = { status: "ok" };
      })
      .catch(async (e) => {
        await prisma.$disconnect();
        console.log(e);
        throw createError({
          statusCode: 400,
          message: "Nuzter existiert bereits",
        });
      });
  });

  return response;

  async function dbOps(hashedPassword: string) {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });
    return user;
  }
});
