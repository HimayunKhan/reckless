
import { getSession } from 'next-auth/react';
import  ErrorHandler  from "@/app/backend/utils/errorHandler";



const isAuthenticatedUser = async (req, sessionToken, next) => {
	try {
		
  
	  if (!sessionToken) {
		throw new ErrorHandler('Login first to access this route', 401);
	  }
  
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
