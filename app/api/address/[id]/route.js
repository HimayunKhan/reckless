import dbConnect from "@/app/backend/config/dbConnect";

import createErrorResponse from "@/app/backend/middlewares/errors";
import Address from "@/app/backend/models/address";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const id = context.params.id;

  try {
    dbConnect();

    const AllAddress = await Address.findById({ _id: id });

    const res = {
      success: true,
      message: "Address fetched successfully",
      AllAddress,
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error);
  }
}

export async function PUT(request, context) {
  const userID = context.params.id;

  try {
    dbConnect();

    const { street, city, state, zipCode, phoneNo, country } =
      await request.json();

    const updatedADD = {
      street,
      city,
      state,
      zipCode,
      phoneNo,
      country,
    };
    let address = await Address.findById({ _id: userID });

    address = await Address.findByIdAndUpdate(userID, updatedADD);

    const res = {
      success: true,
      message: "Address updated successfully",
      data: address,
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error);
  }
}

export async function (request, context) {
  const { id } = context.params; // Assuming the ID is passed as a parameter

  try {
    dbConnect(); // Assuming this is your database connection function

    await Address.deleteOne({ _id: id }); // Assuming Address is your model

    const res = {
      success: true,
      message: "Address deleted successfully",
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error); 
  }
}
