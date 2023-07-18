import dbConnect from "@/app/backend/config/dbConnect";
import createErrorResponse from "@/app/backend/middlewares/errors";
import User from "@/app/backend/models/user";
import { createRouter } from "next-connect";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const router = createRouter();

dbConnect();

router.post(async (req, res) => {
  try {
    const { items, shippingInfo } = await req.json();

    const sessionData = await getServerSession(authOptions);
    const userID = sessionData?.user?.id;
    const user = sessionData?.user;
	console.log("userrrrrr",userID)

    const line_items = items?.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item?.name,
            images: [item?.image],
            metadata: { productId: item?.product },
          },
          unit_amount: item?.price * 100,
        },
        tax_rates: ["txr_1NV711SHxFudyksW6igP12K8"],
        quantity: item?.quantity,
      };
    });

    //   const shippingInfo = body?.shippingInfo;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.API_URL}/me/orders?order_success=true`,
      cancel_url: `${process.env.API_URL}`,
      customer_email: user?.email,
      client_reference_id: user?.id,
      mode: "payment",
      metadata: { shippingInfo },
      shipping_options: [
        {
          shipping_rate: "shr_1NV6ydSHxFudyksW9nts4Bf2",
        },
      ],
      line_items,
    });

    const res = {
      success: true,
      message: "all products checkout successfully",
	  url:session.url,
    };

    return NextResponse.json(res);
    // return new Response("himaaaaaaaaa")
  } catch (error) {
    return createErrorResponse(error);
  }
});

export async function POST(request, ctx) {
  return router.run(request, ctx);
}
