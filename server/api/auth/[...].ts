import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
  providers: [
    // @ts-expect-error Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        // const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' }
        const token = Buffer.from(
          `${credentials.username}:${credentials.password}`
        ).toString("base64");
        const res = await fetch("http://localhost/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token}`,
          },
        });
        const user = await res.json();
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
});
