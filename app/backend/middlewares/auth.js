// // import { getSession } from "next-auth/client";
// import { useSession } from "next-auth/react";
// import { ErrorHandler } from "@/app/backend/utils/errorHandler";

// const isAuthenticatedUser = async (req, res, next) => {
//   try {
//     const session = useSession();

//     if (!session) {
//       // throw new ErrorHandler("Login first to access this route", 401);
//       throw new Error("Login first to access this route");
//     }

//     req.user = session.user;

//     // next();
//   } catch (error) {
//     console.log(error);
//   }
// };

// const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHandler(
//           `Role (${req.user.role}) is not allowed to access this resource.`
//         )
//       );
//     }

//     next();
//   };
// };

// export { isAuthenticatedUser, authorizeRoles };



import { getSession } from 'next-auth/react';
import  ErrorHandler  from "@/app/backend/utils/errorHandler";



const isAuthenticatedUser = async (req, sessionToken, next) => {
	try {
		// const session = await getSession({ req });
		// console.log("akakka",session)
  
	  if (!sessionToken) {
		throw new ErrorHandler('Login first to access this route', 401);
	  }
  
	//   req.user = session.user;
	//   next();
	return req
	} catch (error) {
	  console.log(error);
	}
  };



const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource.`
        )
      );
    }

    next();
  };
};

export { isAuthenticatedUser, authorizeRoles };
