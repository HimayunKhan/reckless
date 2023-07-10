import dbConnect from "@/app/backend/config/dbConnect";
import createErrorResponse from "@/app/backend/middlewares/errors";
import Address from "@/app/backend/models/address";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    dbConnect();
    const {
      street,
      city,
      state,
      phoneNo,
      zipCode,
      country,
      // Add the `user` field to the destructured assignment
    } = await request.json();

    const addressDoc = await Address.create({
      street,
      city,
      state,
      phoneNo,
      zipCode,
      country,
      // Include the `user` field in the `Address.create` call
    });

    const res = {
      success: true,
      message: "Address created successfully",
      data: addressDoc,
    };

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
  
    return createErrorResponse(error)
  }
}


export async function GET(request, response) {
  try {
    dbConnect();

    const AllAddress = await Address.find();

    const res = {
      success: true,
      message: "Address fetched successfully",
      data: {
        AllAddress,
      },
    };

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.error(error);
  }
}
