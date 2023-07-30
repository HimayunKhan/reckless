import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import User from "../../../backend/models/user"; 
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { mongooseConnect } from "@/lib/mongoose";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    



    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        mongooseConnect(); // Connect to the database
        const { email, password } = credentials;
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          // throw new Error("Invalid Email or Password");
          return null;
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          // throw new Error("Invalid Email or Password");
          return null;
        }

        return { ...user._doc, id: user._id.toString() };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, session, trigger }) => {
      user && (token.user = user);

      if (trigger == "update") {
        return [...token, ...session.user];
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      delete session?.user?.password;
      return session;
    },
    async signIn({ account, profile }) {
      console.log("proooofile",profile)
      return true;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


