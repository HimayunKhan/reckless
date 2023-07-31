// import React from "react";
// import axios from "axios";
// import queryString from "query-string";
// import Products from "@/components/admin/Products";

// const getProducts = async (searchParams) => {
//   const urlParams = {
//     page: searchParams.page,
//   };

//   const searchQuery = queryString.stringify(urlParams);

//   const { data } = await axios.get(
//     `${process.env.API_URL}/api/products?${searchQuery}`
//   );
//   return data?.data;
// };

// const HomePage = async ({ searchParams }) => {
//   const data = await getProducts(searchParams);

//   return <Products data={data} />;
// };

// export default HomePage;



"use client"
import React, { Suspense, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import Products from "@/components/admin/Products";
import Loader from "@/components/layouts/Loader";

const getProducts = async (searchParams) => {
  const urlParams = {
    page: searchParams.page,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/products?${searchQuery}`
  );
  return data?.data;
};

const HomePage = ({ searchParams }) => {
  // Use Suspense to handle the async operation
  return (
    <Suspense fallback={<div className="text-center text-32  text-black">
    <Loader />
  </div>}>
      <HomeContent searchParams={searchParams} />
    </Suspense>
  );
};

const HomeContent = ({ searchParams }) => {
  // Use React.useEffect to call the async function and set the state
  const [data, setData] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts(searchParams);
      setData(productsData);
    };
    fetchData();
  }, [searchParams]);

  // Render the Products component once the data is available
  return data ? <Products data={data} /> : null;
};

export default HomePage;
