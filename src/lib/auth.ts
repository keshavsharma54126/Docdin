import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import db from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "john@gmail.com",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (existingUser) {
          const passwordValid = await bcrypt.compare(
            credentials.password,
            existingUser.password || ""
          );
          if (passwordValid) {
            return {
              id: existingUser.id,
              name: existingUser.fullName,
              email: existingUser.email,
            };
          }
          return null;
        }

        try {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const newUser = await db.user.create({
            data: {
              fullName: "Guest",
              email: credentials.email,
              password: hashedPassword,
            },
          });

          return {
            id: newUser.id,
            name: newUser.fullName,
            email: newUser.email,
          };
        } catch (error) {
          console.error("Error creating user:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
