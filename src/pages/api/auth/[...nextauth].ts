import NextAuth, { type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  "pages": {
    "signIn": "/login",
    // signOut: "/auth/signout",
  },
  "jwt": {
    "maxAge": 60 * 60 * 24 * 30,
  },
  // Include user.id on session
  "callbacks": {
    session({ session }) {
      return session;
    },
  },
  "session": { "strategy": "jwt" },
  // Configure one or more authentication providers
  "adapter": PrismaAdapter(prisma),
  "providers": [
    GoogleProvider({
      "clientId": env.GOOGLE_CLIENT_ID,
      "clientSecret": env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
