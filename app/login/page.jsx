// import Login from "@/components/auth/Login";
// import React from "react";

// const LoginPage = () => {
//   return <Login />;
// };

// export default LoginPage;



import Loader from "@/components/layouts/Loader";
import React, { Suspense, lazy } from "react";

// Use the lazy function to asynchronously import the Login component
const LazyLogin = lazy(() => import("@/components/auth/Login"));

const LoginPage = () => {
  return (
    // Wrap the component in Suspense and specify a fallback (loading) component to be shown while the Login component is loading.
    <Suspense fallback={<div className="text-center text-32  text-black"><Loader/></div>}>
      <LazyLogin />
    </Suspense>
  );
};

export default LoginPage;

