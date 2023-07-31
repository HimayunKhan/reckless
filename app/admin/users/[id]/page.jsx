import axios from "axios";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import UpdateOrder from "@/components/admin/UpdateOrder";
import UpdateUser from "@/components/admin/UpdateUser";
import Loader from "@/components/layouts/Loader";

const getUser = async (id) => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const { data } = await axios.get(
    `${process.env.API_URL}/api/admin/users/${id}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data;
};

const AdminUserDetailsPage = async ({ params }) => {
  const data = await getUser(params?.id);

  return (
    <Suspense
      fallback={
        <div className="text-center text-32  text-black">
          <Loader />
        </div>
      }
    >
      <UpdateUser user={data?.userdetails} />;
    </Suspense>
  );
};

export default AdminUserDetailsPage;
