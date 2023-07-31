"use client";
import React, { Suspense } from "react";
import Banner from "@/components/layouts/Banner";
import AuthContext from "@/context/AuthContext";
import { useContext, useState } from "react";
import Loader from "@/components/layouts/Loader";

const LazyHomeProducts = React.lazy(() =>
  import("@/components/products/HomeProducts")
);

export default function Home() {
  const { AllProductsData } = useContext(AuthContext);

  return (
    <>
      <div className=" max-w-screen-xl mx-auto ">
        <Banner />
        <div className="relative md:-mt-10 lgl:-mt-32 xl:-mt-55 z-20 mb-10">
          <Suspense fallback={<div className="text-center text-32  text-black"><Loader/></div>}>
            <LazyHomeProducts data={AllProductsData} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
