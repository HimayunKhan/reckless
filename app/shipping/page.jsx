import axios from "axios";
import { cookies } from "next/headers";
import Shipping from "@/components/cart/Shipping";
import Loader from "@/components/layouts/Loader";
import React, { Suspense, lazy } from "react";


const getAddresses = async () => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
    headers: {
      Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
    },
  });

  return data?.data?.AllAddress;
};

const ShippingPage = async () => {
  const addresses = await getAddresses();
return(
  <Suspense
    fallback={
      <div className="text-center text-32  text-black">
        <Loader />
      </div>
    }
  >
    <Shipping addresses={addresses} />;
  </Suspense>)
};

export default ShippingPage;
