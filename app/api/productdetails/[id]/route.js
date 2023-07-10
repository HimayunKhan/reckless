import dbConnect from "@/app/backend/config/dbConnect";
import ProductModel from "@/app/backend/models/product";
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
    return NextResponse.error(error);
  }
}
