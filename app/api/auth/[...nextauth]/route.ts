import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        console.log({ credentials });
        const user = await prisma.user.findUnique({
          where: { email: `${credentials?.email}` },
        });
        const isPasswordCorrect = await compare(
          `${credentials?.password}`,
          user?.password!
        );
        console.log({ isPasswordCorrect });
        console.log({ user });

        // if given password matches the hash in the database
        if (isPasswordCorrect) {
          return Promise.resolve(user);
        } else {
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
