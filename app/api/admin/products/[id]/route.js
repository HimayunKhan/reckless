

import dbConnect from "@/app/backend/config/dbConnect";
import createErrorResponse from "@/app/backend/middlewares/errors";
import ProductModel from "@/app/backend/models/product";
import { cloudinary } from "@/app/backend/utils/cloudinary";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    dbConnect();

    const id = context.params.id;

    if (id) {
      const foundProduct = await ProductModel.findOne({ _id: id });

      if (!foundProduct) {
        const res = {
          success: false,
          message: "Product not found",
          data: null,
        };

        return NextResponse.json(res);
      }

      const res = {
        success: true,
        message: "Product fetched successfully",
        data: foundProduct,
      };

      return NextResponse.json(res);
    }
  } catch (error) {
    return createErrorResponse(error); // Assuming you have the createErrorResponse function implemented
  }
}

export async function PUT(request, context) {
  try {
    dbConnect();

    const id = context.params.id;

    const productData = await request.json();

    let product = await ProductModel.findById(id);

    if (!product) {
      return new Response("Product not found.", 404);
    }

    product = await ProductModel.findByIdAndUpdate(id, productData, {
      new: true,
    });

    const res = {
      success: true,
      message: "Product details updated successfully",
      data: product,
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error); // Assuming you have the createErrorResponse function implemented
  }
}

export async function DELETE(request, context) {
  const { id } = context.params; // Assuming the ID is passed as a parameter

  try {
    dbConnect(); // Assuming this is your database connection function

    let product = await ProductModel.findById(id);

    if (!product) {
      return new Response("Product not found.", 404);
    }

    for (let i = 0; i < product.images.length; i++) {
      const res = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    await ProductModel.deleteOne({ _id: id }); // Assuming Address is your model

    const res = {
      success: true,
      message: "Product deleted successfully",
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error); // Assuming you have the createErrorResponse function implemented
  }
}
