import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import PrismaDB from "~~/utils/prismaDB";

export default NuxtAuthHandler({
  pages: {
    signIn: "/login",
  },
  secret: "noRealSecretYet", //@TODO: Change this to a real secret
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
        async function getUser() {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.username,
            },
          });
          return user;
        }

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

        if (user && user.password === credentials.password) {
          const userData = {
            name: user.name,
            email: user.email,
            isCreator: user.isCreator,
          };

          return userData;
        } else {
        }
      },
    }),
  ],
});
