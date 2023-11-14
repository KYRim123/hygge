import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        tai_khoan: { label: "UserName", type: "text", placeholder: "jsmith" },
        mat_khau: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await axios({
          method: "post",
          url: `${process.env.HTTPS_URL}/api/user/login`,
          data: {
            tai_khoan: credentials?.tai_khoan,
            mat_khau: credentials?.mat_khau,
          },
        });
        var user = res.data;
        if (user.status) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ token, session }) {
      session.user = token;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
