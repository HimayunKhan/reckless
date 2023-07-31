import dbConnect from "@/app/backend/config/dbConnect";
import { isAuthenticatedUser } from "@/app/backend/middlewares/auth";
import createErrorResponse from "@/app/backend/middlewares/errors";
import Address from "@/app/backend/models/address";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request, response) {
  try {
    dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user?.id;
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
      user,
      // Include the `user` field in the `Address.create` call
    });

    const response = {
      success: true,
      message: "Address created successfully",
      data: addressDoc,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return createErrorResponse(error);
  }
}

export async function GET(request, response) {
  try {
    dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user?.id;
    const AllAddress = await Address.find({user});

    const response = {
      success: true,
      message: "Address fetched successfully",
      data: {
        AllAddress,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    return createErrorResponse(error);
  }
}
