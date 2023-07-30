// import ProductDetails from "@/components/products/ProductDetails";
// import axios from "axios";
// import React from "react";

// const getProductDetails = async (id) => {
//   const { data } = await axios.get(
//     `${process.env.API_URL}/api/productdetails/${id}`
//   );
//   return data?.data;
// };

// const ProductDetailsPage = async ({ params }) => {
//   const product = await getProductDetails(params.id);

//   return <ProductDetails product={product} />;
// };

// export default ProductDetailsPage;



import Loader from "@/components/layouts/Loader";
import React, { lazy, Suspense } from "react";

// Use the lazy function to asynchronously import the ProductDetailsLoader component
const LazyProductDetailsLoader = lazy(() => import("@/components/products/ProductDetailsLoader"));

const ProductDetailsPage = ({ params }) => {
  return (
    // Wrap the component in Suspense and specify a fallback (loading) component to be shown while the ProductDetailsLoader component is loading.
    <Suspense fallback={<div className="text-center text-32  text-black"><Loader/></div>}>
      <LazyProductDetailsLoader productId={params.id} />
    </Suspense>
  );
};

export default ProductDetailsPage;
