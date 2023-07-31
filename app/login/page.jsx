import Loader from "@/components/layouts/Loader";
import React, { Suspense, lazy } from "react";


const LazyLogin = lazy(() => import("@/components/auth/Login"));

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="text-center text-32  text-black">
          <Loader />
        </div>
      }
    >
      <LazyLogin />
    </Suspense>
  );
};

export default LoginPage;
