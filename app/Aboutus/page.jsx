import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="max-w-container mx-auto px-4  ">
      <div className="p-10  text-center">
        <h1 className="max-w-[600px] text-base text-lightText mb-2 ">
          <span className="text-primeColor font-semibold text-lg ">Chokha</span>{" "}
          is one of the world's leading ecommerce brands and is internationally
          recognized for celebrating the essence of classic Worldwide cool
          looking style.
        </h1>
        <Link href={`/`}>
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default page;
