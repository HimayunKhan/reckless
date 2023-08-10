"use client";
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
  return (
    <Suspense
      fallback={
        <div className="text-center text-32  text-black">
          <Loader />
        </div>
      }
    >
      <HomeContent searchParams={searchParams} />
    </Suspense>
  );
};

const HomeContent = ({ searchParams }) => {
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
