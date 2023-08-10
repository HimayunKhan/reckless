import dbConnect from "@/app/backend/config/dbConnect";
import createErrorResponse from "@/app/backend/middlewares/errors";
import { createRouter } from "next-connect";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Order from "@/app/backend/models/order";
import APIFilters from "@/app/backend/utils/APIFilters";


const router = createRouter();

dbConnect();

router.get(async (req, res) => {
  try {
	  const { searchParams } = new URL(req?.url);
	  const searchQuery = Object.fromEntries(searchParams.entries());
	  
	  const session = await getServerSession(authOptions);
	  const userID = session?.user?.id;
	
	  const resPerPage = 2;
	  
	  const apiFilters = new APIFilters(Order.find(), searchQuery).pagination(
		  resPerPage
		  );
		  
		  
		  const orders = await apiFilters.query
		  .find({ user: userID })
		  .populate({
			  path: "shippingInfo",
			  model: "Address",
			})
			.populate({
				path: "user",
				model: "User",
			})
			.exec();
			
			
			const ordersCount = orders.length
	
    const res = {
      success: true,
      message: "fetched orders details successfully",
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
