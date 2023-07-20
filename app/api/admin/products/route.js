import dbConnect from "@/app/backend/config/dbConnect";
import { newProductAdmin } from "@/app/backend/controllers/productControllers";
import { authorizeRoles } from "@/app/backend/middlewares/auth";
import { createRouter } from "next-connect";

// export async function POST(request, response) {
// 	try {
// 	  dbConnect();
// 	  const {
// 		name,
// 		description,
// 		price,
// 		seller,
// 		stock,
// 		category,
// 		images,
// 		reviews,
// 	  } = await request.json();

// 	  const productDoc = await ProductModel.create({
// 		name,
// 		description,
// 		price,
// 		seller,
// 		stock,
// 		category,
// 		images,
// 		reviews,
// 	  });

// 	  const res = {
// 		success: true,
// 		message: "Product created successfully",
// 		data: productDoc,
// 	  };

// 	  return NextResponse.json(res);
// 	} catch (error) {
// 	  return createErrorResponse(error)
// 	}
//   }

const router = createRouter();

dbConnect();

router.use(authorizeRoles("admin")).post(newProductAdmin);

export async function POST(request, ctx) {
  return router.run(request, ctx);
}
