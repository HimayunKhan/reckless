import UpdateProfile from "@/components/auth/UpdateProfile";
import Loader from "@/components/layouts/Loader";
import React, { Suspense } from "react";

const UpdateProfilePage = () => {
  return (
    <Suspense
      fallback={
        <div className="text-center text-32  text-black">
          <Loader />
        </div>
      }
    >
      <UpdateProfile />;
    </Suspense>
  );
};

export default UpdateProfilePage;
