import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectMongo } from "../../../lib/mongodb"; // ✅ adjust path if needed
import { User } from "../../../models/User";          // ✅ adjust path if needed
import bcrypt from "bcryptjs";

const providers = [
  GithubProvider.default({
    clientId: process.env.GITHUB_CLIENT_ID ?? "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
  }),
  GoogleProvider.default({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  }),
  CredentialsProvider.default({
    name: "Credentials",
    credentials: {
      name: { label: "Name", type: "text" },
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      await connectMongo();

      const { email, password } = credentials;

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found. Please sign up first.");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      };
    }
  }),
];

export const authOptions = {
  providers,
  pages: {
    signIn: '/login', // custom login page
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? "your-secret-key",
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth.default(authOptions);
export { handler as GET, handler as POST };
