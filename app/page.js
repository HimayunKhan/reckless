"use client";
import ListProducts from "@/components/products/ListProducts";
import AuthContext from "@/context/AuthContext";
import axios from "axios";

import queryString from "query-string";
import { useContext, useState } from "react";

// const getProducts = async (searchParams) => {
//   const urlParams = {
//     keyword: searchParams.keyword,
//     page: searchParams.page,
//     category: searchParams.category,
//     "price[gte]": searchParams.min,
//     "price[lte]": searchParams.max,
//     "ratings[gte]": searchParams.ratings,
//   };

//   const searchQuery = queryString.stringify(urlParams);

//   const { data } = await axios.get(
//     `${process.env.API_URL}/api/products?${searchQuery}`
//   );
//   return data;
// };

export default function Home({ searchParams }) {
  // const productsData = await getProducts(searchParams);


  const { filteredProducts } = useContext(AuthContext);

  return <ListProducts data={filteredProducts} />;
}
