import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import User from "../../../backend/models/user"; // Update the path accordingly
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { mongooseConnect } from "@/lib/mongoose";

export const authOptions = {
  providers: [
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
          throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        // Return the authenticated user
        return { ...user._doc, id: user._id.toString() };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user,session,trigger }) => {
      user && (token.user = user);

      if(trigger=="update"){
        return [...token,...session.user]
      }

    

      // if (req.url === "/api/auth/session?update") {
      //   // hit the db and eturn the updated user

      //   const updatedUser = await User.findById(token.user._id);
      //   token.user = updatedUser;
      // }
      
  
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;

     


      // delete password from session
      delete session?.user?.password;

      return session;
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

