import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      // If you have a proper SMTP string in EMAIL_SERVER/EMAIL_FROM, NextAuth will use it.
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // Optional: customize the email content (subject/html)
      // sendVerificationRequest can be added if you want custom template (see example below)
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = session.user ?? {};
      (session.user as any).id = token.sub;
      return session;
    },
  },
  //   callbacks: {
  //     async session({ session, token }) {
  //       // attach role based on email in token
  //       const email = session?.user?.email?.toLowerCase() ?? "";
  //       session.user = session.user ?? {};
  //       (session.user as any).role = adminList.includes(email) ? "admin" : "member";
  //       return session;
  //     },
  //     async jwt({ token, user }) {
  //       // no DB here; we just keep token
  //       return token;
  //     },
  //   },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
