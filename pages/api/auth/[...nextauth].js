import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mainApi from "../manager/mainApi";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "senha", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (credentials && credentials.email && credentials.password) {
          const user = await mainApi.loginUser(
            credentials.password,
            credentials.email
          );
          if (user.data && user.token) {
            return {
              id: user.data.id,
              name: user.data.name,
              email: user.data.email,
              image: user.data.avatar,
              token: user.token,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/manager/login",
  },
};

export default NextAuth(authOptions);
