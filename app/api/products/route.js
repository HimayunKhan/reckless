import dbConnect from "@/app/backend/config/dbConnect";
import createErrorResponse from "@/app/backend/middlewares/errors";
import ProductModel from "@/app/backend/models/product";
import APIFilters from "@/app/backend/utils/APIFilters";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  try {
    dbConnect();

    const { searchParams } = new URL(request?.url);
    const searchQuery = Object.fromEntries(searchParams.entries());

    const resPerPage = 2;
    const productsCount = await ProductModel.countDocuments();
    const apiFilters = new APIFilters(ProductModel.find(), searchQuery)
      .search()
      .filter();

    let products = await apiFilters.query;
    const filteredProductsCount = products.length;
    apiFilters.pagination(resPerPage);

    products = await apiFilters.query.clone();

    const res = {
      success: true,
      message: "Products fetched successfully",
      data: {
        productsCount,
        resPerPage,
        filteredProductsCount,
        products,
      },
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error)
  }
}

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





