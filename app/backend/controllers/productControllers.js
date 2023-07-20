import Product from "../models/product";
import APIFilters from "../utils/APIFilters";
import { cloudinary, uploads } from "../utils/cloudinary";
import fs from "fs";
import ErrorHandler from "../utils/errorHandler";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import dbConnect from "../config/dbConnect";
import createErrorResponse from "../middlewares/errors";
import ProductModel from "@/app/backend/models/product";
import { NextResponse } from "next/server";


export const newProduct = async (req, res, next) => {
  req.body.user = req.user._id;

  const product = await Product.create(req.body);
  res.status(201).json({
    product,
  });
};

export const newProductAdmin = async (req, res) => {
  try {
    dbConnect();
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;
    const {
      name,
      description,
      price,
      seller,
      stock,
      category,
      images,
      reviews,
    
    } = await req.json();

    const productDoc = await ProductModel.create({
      name,
      description,
      price,
      seller,
      stock,
      category,
      images,
      reviews,
      userID
    });

    const res = {
      success: true,
      message: "Product created successfully",
      data: productDoc,
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error);
  }


};

export const getProducts = async (req, res, next) => {
  const resPerPage = 2;
  const productsCount = await Product.countDocuments();

  const apiFilters = new APIFilters(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFilters.query;
  const filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);

  products = await apiFilters.query.clone();

  res.status(200).json({
    productsCount,
    resPerPage,
    filteredProductsCount,
    products,
  });
};

export const getProduct = async (req, res, context) => {

  const id=context.params.id

  // const product = await Product.findById(req.query.id);

  // if (!product) {
  //   return next(new ErrorHandler("Product not found.", 404));
  // }

  // res.status(200).json({
  //   product,
  // });

  return new Response("huhuhuhu")
};

export const uploadProductImages = async (req, res, context) => {
  const productURL = new URL(req.url);
  const pathnameParts = productURL.pathname.split('/');
  const productId = pathnameParts[pathnameParts.length - 1];
  // let product = await Product.findById(req.query.id);
 
  
 
  let product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  const uploader = async (path) => await uploads(path, "buyitnow/products");

  const urls = [];
  // const files = req.files;
  const formData=await req.formData()
  const files = formData.get("image");


  for (const file of files) {
    const { path } = file;
    const imgUrl = await uploader(path);
    urls.push(imgUrl);
    fs.unlinkSync(path);
  }

  product = await Product.findByIdAndUpdate(productId, {
    images: urls,
  });

  // // res.status(200).json({
  // //   data: urls,
  // //   product,
  // // });

  const response={
    success:true,
    message:"product images successfully uploaded",
    data:urls,
    product
  }
  return NextResponse.json(response)
  // return new Response("hiiimmaaa")
};

export const updateProduct = async (req, res, context) => {

  const productId=context.params.id
};

export const deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  // Deleting images associated with the product
  for (let i = 0; i < product.images.length; i++) {
    const res = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
  });
};

export const createProductReview = async (req, res, next) => {


  const sessionData = await getServerSession(authOptions);
    const userID = sessionData?.user?.id;
  
  const { rating, comment, productId } = await req.json();


  const review = {
    user: userID,
    rating: Number(rating),
    comment,
  };

  let product = await Product.findById(productId);

  if (!product) {
    return new Response("Product not found.", 404);
  }

  const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() === userID.toString()
  );

  if (isReviewed) {
    product?.reviews.forEach((review) => {
      if (review.user.toString() === userID.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product?.reviews.push(review);
  }

  product.ratings =
    product?.reviews?.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product?.save();

  const response={
    success:true,
    message:"review submitted"
  }

 return NextResponse.json(response)
};
