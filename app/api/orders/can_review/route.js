import dbConnect from "@/app/backend/config/dbConnect";
import { createRouter } from "next-connect";

import { canReview } from "@/app/backend/controllers/orderControllers";

const router = createRouter();

dbConnect();

router.get(canReview);

export async function GET(request, ctx) {
  return router.run(request, ctx);
}
