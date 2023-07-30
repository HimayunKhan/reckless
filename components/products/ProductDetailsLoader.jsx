
"use client"
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ProductDetails from "@/components/products/ProductDetails";
import Loader from "../layouts/Loader";

const ProductDetailsLoader = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API_URL}/api/productdetails/${productId}`
        );
        setProduct(data?.data);
      } catch (error) {
        // Handle error here if needed
      }
    };

    getProductDetails();
  }, [productId]);

  // Memoize the ProductDetails component to prevent unnecessary re-renders
  const memoizedProductDetails = useMemo(() => <ProductDetails product={product} />, [product]);

  return <>{product ? memoizedProductDetails : <div className="text-center text-32  text-black"><Loader/></div>}</>;
};

export default ProductDetailsLoader;
