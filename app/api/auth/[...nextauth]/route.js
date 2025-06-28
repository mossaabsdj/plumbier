// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        // Fetch admin from DB
        const admin = await prisma.admin.findFirst({
          where: {
            User: credentials.username,
            Password: credentials.password,
          },
        });
        if (admin) {
          return { id: admin.id, name: admin.User, email: "" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/Login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
