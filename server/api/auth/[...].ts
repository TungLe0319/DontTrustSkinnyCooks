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

const adapter = PrismaAdapter(prisma())

// Refer to Auth.js docs for more details
export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  session:{
    strategy: "jwt"
  },
  adapter,
  providers: [
    CredentialsProvider({
       // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "email", type: "text", placeholder: "jsmith@gmail.com", },
      password: { label: "Password", type: "password" }
    },
      async authorize(credentials, req) {
        
        let user = await adapter.getUserByEmail!(credentials.email as string)
        return user;
      },
    }),
    GoogleProvider({
      clientId: runtimeConfig.google.clientId,
      clientSecret: runtimeConfig.google.clientSecret,
    }),
  ],

  callbacks: {
    session(params) {
      if (params.session.user) {
        params.session.user.id = params.token.sub ?? 'NOUSER'
      }
      console.log({ params , session:params.session});
      return params.session
    },
  },
};

export default NuxtAuthHandler(authOptions, runtimeConfig);
// If you don't want to pass the full runtime config,
//  you can pass something like this: { public: { authJs: { baseUrl: "" } } }
