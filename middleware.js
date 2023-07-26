import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    // authorize roles
    const url = req.nextUrl.pathname;
    const userRole = req?.nextauth?.token?.user?.role;

   

    if (url?.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) {
          return false;
        }
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/me/:path*", "/shipping"],
  // matcher: [ "/me/:path*", "/shipping"],
};



// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   async function middleware(req) {
//     // Generate a unique nonce-like string for CSP using Unix timestamp and a random string
//     const randomString = Math.random().toString(36).slice(2);
//     const timestamp = Date.now().toString();
//     const nonce = `${timestamp}-${randomString}`;

//     const csp = `script-src 'self' 'nonce-${nonce}'`;

//     // Clone the request headers to avoid modifying the original request headers directly
//     const requestHeaders = new Headers(req.headers);

//     // Set the CSP header in the request headers
//     requestHeaders.set("Content-Security-Policy", csp);

//     // Create a new response with the updated request headers
//     const response = NextResponse.next({
//       request: {
//         // New request headers
//         headers: requestHeaders,
//       },
//     });

//     // Set the CSP header in the response headers so that it is outputted to the browser
//     response.headers.set("Content-Security-Policy", csp);

//     // authorize roles
//     const url = req.nextUrl.pathname;
//     const userRole = req?.nextauth?.token?.user?.role;

//     if (url?.startsWith("/admin") && userRole !== "admin") {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     return response;
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         if (!token) {
//           return false;
//         }
//       },
//     },
//   }
// );

// export const config = {
//   matcher: ["/admin/:path*", "/me/:path*", "/shipping"],
// };
