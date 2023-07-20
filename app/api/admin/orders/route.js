import dbConnect from "@/app/backend/config/dbConnect";
import createErrorResponse from "@/app/backend/middlewares/errors";
import { createRouter } from "next-connect";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Order from "@/app/backend/models/order";
import APIFilters from "@/app/backend/utils/APIFilters";
// import Address from "@/app/backend/models/address";
// import User from "@/app/backend/models/user";
// import { myOrders } from "@/app/backend/controllers/orderControllers";

const router = createRouter();

dbConnect();

router.get(async (req, res) => {
  try {
    const { searchParams } = new URL(req?.url);
    const searchQuery = Object.fromEntries(searchParams.entries());

    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;

    const resPerPage = 2;
    const ordersCount = await Order.countDocuments();

    const apiFilters = new APIFilters(Order.find(), searchQuery).pagination(
      resPerPage
    );

    const orders = await apiFilters.query
      .find()
      .populate({
        path: "shippingInfo",
        model: "Address",
      })
      .populate({
        path: "user",
        model: "User",
      })
      .exec();

    const res = {
      success: true,
      message: "fetched all orders details successfully",
      ordersCount,
      resPerPage,
      orders,
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error);
  }
});

export async function GET(request, ctx) {
  return router.run(request, ctx);
}
