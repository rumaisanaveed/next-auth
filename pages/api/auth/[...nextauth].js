import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectDB();

        try {
          const db = client.db().collection("user");
          const user = await db.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found!");
          }

          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Could not log you in!");
          }

          return { email: user.email };
        } catch (error) {
          throw new Error(error.message || "An error occurred!");
        } finally {
          client.close();
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = user;
      return session;
    },
  },
});
