

import Loader from "@/components/layouts/Loader";
import React, { lazy, Suspense } from "react";

const LazyProductDetailsLoader = lazy(() => import("@/components/products/ProductDetailsLoader"));

const ProductDetailsPage = ({ params }) => {
  return (
    <Suspense fallback={<div className="text-center text-32  text-black"><Loader/></div>}>
      <LazyProductDetailsLoader productId={params.id} />
    </Suspense>
  );
};

export default ProductDetailsPage;
