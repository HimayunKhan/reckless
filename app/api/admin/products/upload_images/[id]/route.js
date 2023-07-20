
import dbConnect from "@/app/backend/config/dbConnect";
import ProductModel from "@/app/backend/models/product";
import createErrorResponse from "@/app/backend/middlewares/errors";
import { createRouter } from "next-connect";
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

async function uploadPhotosToCloudinary(newFiles) {
  const multiplePhotosPromise = newFiles.map((file) => {
    return cloudinary.v2.uploader.upload(file.filepath, {
      folder: "buyitnow/products",
    });
  });

  return await Promise.all(multiplePhotosPromise);
}

async function savePhotosToLocal(formData) {
  const files = formData.getAll("image");

  const multipleBufferPromise = files.map(async (file) => {
    const data = await file.arrayBuffer();
    const buffer = Buffer.from(data);
    const name = uuidv4();
    const ext = file.type.split("/")[1];
    const tempdir = os.tmpdir();
    const uploadDir = path.join(tempdir, `/${name}.${ext}`);
    await fs.promises.writeFile(uploadDir, buffer);
    return { filepath: uploadDir, filename: file.name };
  });

  return await Promise.all(multipleBufferPromise);
}

dbConnect();
router.post(async (req, res) => {
  try {
    const productURL = new URL(req.url);
    const pathnameParts = productURL.pathname.split("/");
    const productId = pathnameParts[pathnameParts.length - 1];
    let product = await ProductModel.findById(productId);

    const formData = await req.formData();

    const newFiles = await savePhotosToLocal(formData);

    const photos = await uploadPhotosToCloudinary(newFiles);

    newFiles.map((file) => fs.unlinkSync(file.filepath));

    const urls = [];

    const imageurl = photos.map((item) => {
      const image = {
        public_id: item.public_id,
        url: item.secure_url,
      };
      urls.push(image);
    });

    product = await ProductModel.findByIdAndUpdate(productId, {
      images: urls,
    },{new:true});

    const response = {
      success: true,
      message: "product images uploaded successfully",
      data: urls,
      product,
    };

    return NextResponse.json(response);
  } catch (error) {
    return createErrorResponse(error);
  }
});

export async function POST(request, ctx) {
  return router.run(request, ctx);
}
