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
import { canReview, myOrders } from "@/app/backend/controllers/orderControllers";
import order from "@/app/backend/models/order";
import { createProductReview } from "@/app/backend/controllers/productControllers";

const router = createRouter();

dbConnect();

router.get(canReview);

export async function GET(request, ctx) {
  return router.run(request, ctx);
}





















