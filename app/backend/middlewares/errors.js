// // export default (err, req, res, next) => {
// //   let error = { ...err };

// //   error.statusCode = err.statusCode || 500;
// //   error.message = err.message || "Internal Server Error";

// //   res.status(error.statusCode).json({
// //     success: false,
// //     error,
// //     message: error.message,
// //     stack: error.stack,
// //   });
// // };



import { NextResponse } from 'next/server';

export default function createErrorResponse(error) {
  const errorResponse = {
    success: false,
    error: {
      statusCode:error.statusCode ||  500,
      message: error.message || 'Internal Server Error',
      stack: error.stack,
     
    },
    message: 'Internal Server Error',
    stack: error.stack,
   
  };

  return new Response(JSON.stringify(errorResponse));
}

