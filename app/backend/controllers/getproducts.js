
import { NextResponse } from 'next/server';
import ProductModel from '@/app/backend/models/product';
import APIFilters from '@/app/backend/utils/APIFilters';
import errorMiddleware from '../middlewares/errors';
import createErrorResponse from '../middlewares/errors';

export const nextproducts = async (request, response) => {
  try {
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
      message: 'Products fetched successfully',
      data: {
        productsCount,
        resPerPage,
        filteredProductsCount,
        products,
      },
    };

    return  NextResponse.json(res);
  } catch (error) {

	const errorResponse = {
		success: false,
		error: {
		  statusCode: 500,
		  message:error.message || 'Internal Server Error',
		  stack: error.stack,
		},
		message: 'Internal Server Error',
		stack: error.stack,
	  };
	  return createErrorResponse(error)
  
  }
};

