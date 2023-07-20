import dbConnect from "@/app/backend/config/dbConnect";
import { updateProfile } from "@/app/backend/controllers/authControllers";
import createErrorResponse from "@/app/backend/middlewares/errors";
import User from "@/app/backend/models/user";
import { uploads } from "@/app/backend/utils/cloudinary";
import upload from "@/app/backend/utils/multer";
import { createRouter } from "next-connect";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import os from "os";

import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = createRouter();
export const config = {
  api: {
    bodyParser: false,
  },
};

async function uploadPhotosToCloudinary(path, name) {
  const pic = [
    cloudinary.v2.uploader.upload(path, { folder: "buyitnow/avatars" }),
  ];

  return await Promise.all(pic);
}

dbConnect();
router.put(async (req, res) => {
  try {
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;

    const formData = await req.formData();

    const newUserData = {
      name: formData.get("name"),
      email: formData.get("email"),
    };

    const file = formData.get("image");



    const buffer = await file.arrayBuffer();
    const name = uuidv4();
    const ext = file.type.split("/")[1];

    const tempdir = os.tmpdir();
    const uploadDir = path.join(tempdir, `/${name}.${ext}`);

    await fs.promises.writeFile(uploadDir, Buffer.from(buffer));

    const photos = await uploadPhotosToCloudinary(uploadDir, file.name);

    fs.unlinkSync(uploadDir);
    newUserData.avatar = {
      public_id: photos[0]?.public_id,
      url: photos[0].secure_url,
    };
    // const user = await User.findByIdAndUpdate(userID, newUserData);
    const user = await User.findByIdAndUpdate(userID, newUserData, {
      new: true,
    });

    return NextResponse.json(user);
  } catch (error) {
    return createErrorResponse(error);
  }
});

export async function PUT(request, ctx) {
  return router.run(request, ctx);
}
