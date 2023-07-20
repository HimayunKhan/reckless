import dbConnect from "@/app/backend/config/dbConnect";
import createErrorResponse from "@/app/backend/middlewares/errors";
import { createRouter } from "next-connect";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Order from "@/app/backend/models/order";
import APIFilters from "@/app/backend/utils/APIFilters";
// import Address from "@/app/backend/models/address";
import User from "@/app/backend/models/user";
// import { myOrders } from "@/app/backend/controllers/orderControllers";

const router = createRouter();

dbConnect();

router.get(async (req, res) => {
  try {
    const { searchParams } = new URL(req?.url);
    const searchQuery = Object.fromEntries(searchParams.entries());

    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;

    const resPerPage = 4;
    const UsersCount = await User.countDocuments();

    const apiFilters = new APIFilters(User.find(), searchQuery).pagination(
      resPerPage
    );

    const Users = await apiFilters.query.find()
    const res = {
      success: true,
      message: "fetched all Users details successfully",
      UsersCount,
      resPerPage,
      Users,
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error);
  }
});

export async function GET(request, ctx) {
  return router.run(request, ctx);
}
