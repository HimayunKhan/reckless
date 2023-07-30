"use client";
import Banner from "@/components/layouts/Banner";
import HomeProducts from "@/components/products/HomeProducts";
import ListProducts from "@/components/products/ListProducts";
import AuthContext from "@/context/AuthContext";



import { useContext, useState } from "react";

export default function Home({ searchParams }) {
  const { filteredProducts } = useContext(AuthContext);

  return (
    <>
      <div className=" max-w-screen-xl mx-auto">
        <Banner />
        <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
          <HomeProducts data={filteredProducts} />
        </div>
      </div>

      {/* <ListProducts data={filteredProducts} /> */}
    </>
  );
}
