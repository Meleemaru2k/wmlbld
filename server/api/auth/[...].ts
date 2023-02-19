import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import PrismaDB from "~~/utils/prismaDB";
import bcrypt from "bcrypt";

export default NuxtAuthHandler({
  pages: {
    signIn: "/login",
  },
  secret: useRuntimeConfig().AuthSecret,
  providers: [
    // @ts-expect-error Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        const prisma = PrismaDB.getClient();

        const user = await getUser()
          .then(async (user) => {
            return user;
          })
          .catch(async (e) => {
            return null;
          })
          .finally(async () => {
            await prisma.$disconnect();
          });

        const passwordIsValid = user?.password
          ? await bcrypt.compare(credentials.password, user?.password)
          : false;

        if (user && passwordIsValid) {
          const userData = {
            name: user.name,
            email: user.email,
            isCreator: user.isCreator,
          };

          return userData;
        } else {
          throw createError({
            statusCode: 500,
            statusMessage: "Login credentaials are incorrect",
          });
        }
        async function getUser() {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.username,
            },
          });
          return user;
        }
      },
    }),
  ],
});
