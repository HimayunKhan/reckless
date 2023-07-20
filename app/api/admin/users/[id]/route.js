import dbConnect from "@/app/backend/config/dbConnect";
import createErrorResponse from "@/app/backend/middlewares/errors";
import { createRouter } from "next-connect";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Order from "@/app/backend/models/order";
import APIFilters from "@/app/backend/utils/APIFilters";
import Address from "@/app/backend/models/address";
import User from "@/app/backend/models/user";
import { myOrders } from "@/app/backend/controllers/orderControllers";
import order from "@/app/backend/models/order";

const router = createRouter();

dbConnect();

router.get(async (req, res, context) => {
  try {
    const productURL = new URL(req.url);
    const pathnameParts = productURL.pathname.split("/");
    const productId = pathnameParts[pathnameParts.length - 1];

    const userdetails = await User.findById(productId)

    if (!userdetails) return new Response("No User Found");

    const res = {
      success: true,
      message: "fetched User details successfully",
      userdetails,
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error);
  }
});

export async function GET(request, ctx) {
  return router.run(request, ctx);
}






export async function PUT(request, context) {
  try {
    dbConnect();

    const id = context.params.id;

    const userData = await request.json();

    let user = await User.findById(id);

    if (!user) {
      return new Response("No user with this id.", 404);
    }

    user = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });

    const res = {
      success: true,
      message: "UserRole status updated successfully",
      data: user,
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

    let user = await User.findById(id);

    if (!user) {
      return new Response("user not found.", 404);
    }

    await User.deleteOne({ _id: id }); // Assuming Address is your model

    const res = {
      success: true,
      message: "User deleted successfully",
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error); // Assuming you have the createErrorResponse function implemented
  }
}
