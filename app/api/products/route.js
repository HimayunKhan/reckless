import dbConnect from "@/app/backend/config/dbConnect";
import createErrorResponse from "@/app/backend/middlewares/errors";
import ProductModel from "@/app/backend/models/product";
import { NextResponse } from "next/server";



export async function POST(request, response) {
  try {
    dbConnect();
    const {
      name,
      description,
      price,
      seller,
      stock,
      category,
      images,
      reviews,
    } = await request.json();

    const productDoc = await ProductModel.create({
      name,
      description,
      price,
      seller,
      stock,
      category,
      images,
      reviews,
    });

    const res = {
      success: true,
      message: "Product created successfully",
      data: productDoc,
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error)
  }
}





