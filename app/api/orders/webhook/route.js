import dbConnect from "@/app/backend/config/dbConnect";
import createErrorResponse from "@/app/backend/middlewares/errors";
import { createRouter } from "next-connect";
import { NextResponse } from "next/server";
import { buffer } from "node:stream/consumers";
import Stripe from "stripe";
import Order from "@/app/backend/models/order";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
const router = createRouter();

dbConnect();
async function getCartItems(line_items) {
  return new Promise((resolve, reject) => {
    let cartItems = [];

    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === line_items?.data.length) {
        resolve(cartItems);
      }
    });
  });
}



router.post(async (req, res) => {
  try {
    const rawBody = await buffer(req.body);
    const signature = req.headers.get("stripe-signature");

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const line_items = await stripe.checkout.sessions.listLineItems(
        event.data.object.id
      );

      const orderItems = await getCartItems(line_items);
      const userId = session.client_reference_id;
      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
        amountPaid,
        taxPaid: session.total_details.amount_tax / 100,
      };



      const orderData = {
        user: userId,
        shippingInfo: session.metadata.shippingInfo,
        paymentInfo,
        orderItems,
      };
      
      const order = await Order.create(orderData);
     

      const response = {
        success: true,
        message: "successfull transaction",
        order
      };
      return NextResponse.json(response);
    }
  } catch (error) {
    return createErrorResponse(error);
  }
});

export async function POST(request, ctx) {
  return router.run(request, ctx);
}
