"use client";
import React, { Suspense } from "react"; // Import Suspense
import Banner from "@/components/layouts/Banner";
import HomeProducts from "@/components/products/HomeProducts";
import ListProducts from "@/components/products/ListProducts";
import AuthContext from "@/context/AuthContext";
import { useContext, useState } from "react";

// Lazy load HomeProducts component
const LazyHomeProducts = React.lazy(() =>
  import("@/components/products/HomeProducts")
);

export default function Home({ searchParams }) {
  const { filteredProducts } = useContext(AuthContext);

  return (
    <>
      <div className=" max-w-screen-xl mx-auto">
        <Banner />
        <div className="relative md:-mt-10 lgl:-mt-32 xl:-mt-55 z-20 mb-10">
          {/* Use Suspense with fallback */}
          <Suspense fallback={<div>Loading List Products...</div>}>
            <ListProducts data={filteredProducts} />
          </Suspense>
        </div>
      </div>

      {/* Use Suspense with fallback */}
    </>
  );
}
