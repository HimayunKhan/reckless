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
import { createProductReview } from "@/app/backend/controllers/productControllers";

const router = createRouter();

dbConnect();

router.put(createProductReview);

export async function PUT(request, ctx) {
  return router.run(request, ctx);
}






















// export async function PUT(request, context) {
//   try {
//     dbConnect();

//     const id = context.params.id;

//     const orderData = await request.json();

//     let order = await Order.findById(id);

//     if (!order) {
//       return new Response("No order with this id.", 404);
//     }

//     order = await Order.findByIdAndUpdate(id, orderData, {
//       new: true,
//     });

//     const res = {
//       success: true,
//       message: "Product shipping status updated successfully",
//       data: order,
//     };

//     return NextResponse.json(res);
//   } catch (error) {
//     return createErrorResponse(error); // Assuming you have the createErrorResponse function implemented
//   }
// }

// export async function DELETE(request, context) {
//   const { id } = context.params; // Assuming the ID is passed as a parameter

//   try {
//     dbConnect(); // Assuming this is your database connection function

//     let order = await Order.findById(id);

//     if (!order) {
//       return new Response("Product not found.", 404);
//     }

//     await Order.deleteOne({ _id: id }); // Assuming Address is your model

//     const res = {
//       success: true,
//       message: "Order deleted successfully",
//     };

//     return NextResponse.json(res);
//   } catch (error) {
//     return createErrorResponse(error); // Assuming you have the createErrorResponse function implemented
//   }
// }
