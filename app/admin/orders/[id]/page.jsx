import axios from "axios";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import UpdateOrder from "@/components/admin/UpdateOrder";
import Loader from "@/components/layouts/Loader";

const getOrder = async (id) => {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");
  const { data } = await axios.get(
    `${process.env.API_URL}/api/admin/orders/${id}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data;
};

const AdminOrderDetailsPage = async ({ params }) => {
  const data = await getOrder(params?.id);

  return (
    <Suspense
      fallback={
        <div className="text-center text-32  text-black">
          <Loader />
        </div>
      }
    >
      <UpdateOrder order={data?.orderdetails} />;
    </Suspense>
  );
};

export default AdminOrderDetailsPage;
