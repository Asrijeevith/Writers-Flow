import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      // This is where you would typically validate against your database
      // For demo purposes, we're using a simple check
      if (credentials.email && credentials.password) {
        // Return a mock user
        return {
          id: "1",
          name: "Demo User",
          email: credentials.email,
        };
      }
      return null;
    }
  }),
];

export const authOptions = {
  providers,
  pages: {
    signIn: '/login',
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