import User from "../models/user";
import { uploads } from "../utils/cloudinary";
import fs from "fs";
import ErrorHandler from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import APIFilters from "../utils/APIFilters";
import createErrorResponse from "../middlewares/errors";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const config = {
  api: {
    bodyParser: false,
  },
};

export const updateProfile = async (req, res) => {
  try {
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;

  
    const formData = await req.formData();
    const newUserData = {
      name: formData.get("name"),
      email: formData.get("email"),
    };


    if (formData.has("image")) {
      const file = formData.get("image");

      const { buffer, name, path } = file;
      const uploader = async (path) => await uploads(path, "buyitnow/avatars");

      const avatarResponse = await uploader(path);
      newUserData.avatar = avatarResponse;
    }

    const updatedUser = await User.findByIdAndUpdate(userID, newUserData);

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    return createErrorResponse(error);
  }
};
