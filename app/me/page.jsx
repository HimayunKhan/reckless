// import Profile from "@/components/auth/Profile";
// import axios from "axios";
// import React, { Suspense } from "react";
// import { cookies } from "next/headers";
// import Loader from "@/components/layouts/Loader";

// const getAddresses = async () => {
//   const nextCookies = cookies();
//   const nextAuthSessionToken = nextCookies.get("next-auth.session-token");
//   const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
//     headers: {
//       Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
//     },
//   });

//   return data?.data?.AllAddress;
// };

// const ProfilePage = async () => {
  
//   const addresses = await getAddresses();

//   return (
//     <Suspense fallback={<div className="text-center text-32  text-black"><Loader/></div>}>
//       <Profile addresses={addresses} />
//     </Suspense> 
//   )
// }

// export default ProfilePage;


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page