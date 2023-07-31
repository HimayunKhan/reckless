// import dbConnect from "@/app/backend/config/dbConnect";
// import createErrorResponse from "@/app/backend/middlewares/errors";
// import User from "@/app/backend/models/user";
// import { createRouter } from "next-connect";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";

// const router = createRouter();

// dbConnect();
// router.put(async (req, res) => {
//   try {
//     const session = await getServerSession(authOptions);

//     return NextResponse.json(user);
//   } catch (error) {
//     return createErrorResponse(error);
//   }
// });

// export async function PUT(request, ctx) {
//   return router.run(request, ctx);
// }

import dbConnect from "@/app/backend/config/dbConnect";
import createErrorResponse from "@/app/backend/middlewares/errors";
import User from "@/app/backend/models/user";
import { createRouter } from "next-connect";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const router = createRouter();

dbConnect();

router.put(async (req, res) => {
  try {
    const { currentPassword, newPassword } = await req.json();
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;
    const user = await User.findById(userID).select("+password");

    console.log("usewww",user)

    const isPasswordMatched = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatched) {
      return NextResponse.error("Old password is incorrect", { status: 400 });
    }

    user.password = newPassword;


    console.log("hihihihhhihi",user)
    await user.save();

    const res = {
      success: true,
      message: "Product updated successfully",
    };

    return NextResponse.json(res);
  } catch (error) {
    return createErrorResponse(error);
  }
});

export async function PUT(request, ctx) {
  return router.run(request, ctx);
}
