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

    const orderdetails = await Order.findById(productId)
      .populate({
        path: "shippingInfo",
        model: "Address",
      })
      .populate({
        path: "user",
        model: "User",
      })
      .exec();

    if (!orderdetails) return new Response("No Order Found");

    const res = {
      success: true,
      message: "fetched order details successfully",
      orderdetails,
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
    const orderData = await request.json();
    let order = await Order.findById(id);

    if (!order) {
      return new Response("No order with this id.", 404);
    }

    order = await Order.findByIdAndUpdate(id, orderData, {
      new: true,
    });

    const res = {
      success: true,
      message: "Product shipping status updated successfully",
      data: order,
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error);
  }
}




export async function DELETE(request, context) {
  const { id } = context.params;

  try {
    dbConnect();
    let order = await Order.findById(id);
    if (!order) {
      return new Response("Product not found.", 404);
    }
    await Order.deleteOne({ _id: id });
    const res = {
      success: true,
      message: "Order deleted successfully",
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error);
  }
}
