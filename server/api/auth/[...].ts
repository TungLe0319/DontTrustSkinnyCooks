import GithubProvider from "@auth/core/providers/github";
import CredentialsProvider from "@auth/core/providers/credentials";
import GoogleProvider from "@auth/core/providers/google";
import type { AuthConfig } from "@auth/core/types";
import { NuxtAuthHandler } from "#auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../../utils/prisma";

// The #auth virtual import comes from this module. You can use it on the client
// and server side, however not every export is universal. For example do not
// use sign-in and sign-out on the server side.

const runtimeConfig = useRuntimeConfig();

// Refer to Auth.js docs for more details
export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  adapter: PrismaAdapter(prisma()),
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch("/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        })

        if (!authResponse.ok) {
          return null
        }

        const user = await authResponse.json()

        return user
      },
    }),
    GoogleProvider({
      clientId: runtimeConfig.google.clientId,
      clientSecret: runtimeConfig.google.clientSecret,
    }),
  ],
};

export default NuxtAuthHandler(authOptions, runtimeConfig);
// If you don't want to pass the full runtime config,
//  you can pass something like this: { public: { authJs: { baseUrl: "" } } }
