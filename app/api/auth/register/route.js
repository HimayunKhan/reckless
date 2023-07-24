import dbConnect from "@/app/backend/config/dbConnect";
import createErrorResponse from "@/app/backend/middlewares/errors";
import User from "@/app/backend/models/user";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    dbConnect();
    const { name, email, password } = await request.json();
    const user = await User.create({
      name,
      email,
      password,
    });

    const res = {
      success: true,
      message: "User registered successfully",
      data: {
        user: user.name,
        email: user.email,
      },
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error);
  }
}
