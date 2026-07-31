import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "@/lib/master-users";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) {
    throw new Error("Missing credentials");
  }

  const user = await findUserByEmail(credentials.email);
  if (!user) throw new Error("Invalid email or password");

  const isValid = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (!isValid) throw new Error("Invalid email or password");

  const { password, ...safeUser } = user;
  return safeUser;
}

    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/auth/login",
    error: "/auth/fallback",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token.user) session.user = token.user as any;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
