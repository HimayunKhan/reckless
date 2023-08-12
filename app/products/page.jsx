// "use client";
// import React, { Suspense } from "react"; 
// import Banner from "@/components/layouts/Banner";
// import HomeProducts from "@/components/products/HomeProducts";
// import ListProducts from "@/components/products/ListProducts";
// import AuthContext from "@/context/AuthContext";
// import { useContext, useState } from "react";

// const LazyHomeProducts = React.lazy(() =>
//   import("@/components/products/HomeProducts")
// );

// export default function Home() {
//   const { filteredProducts } = useContext(AuthContext);

//   return (
//     <>
//       <div className=" max-w-screen-xl mx-auto">
//         <Banner />
//         <div className="relative md:-mt-10 lgl:-mt-32 xl:-mt-55 z-20 mb-10">
//           <Suspense fallback={<div>Loading List Products...</div>}>
//             <ListProducts data={filteredProducts} />
//           </Suspense>
//         </div>
//       </div>

//     </>
//   );
// }
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page