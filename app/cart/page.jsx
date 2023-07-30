// import Cart from "@/components/cart/Cart";
// import React from "react";

// const CartPage = () => {
//   return <Cart />;
// };

// export default CartPage;



import Loader from "@/components/layouts/Loader";
import React, { Suspense, lazy } from "react";

// Use the lazy function to asynchronously import the Cart component
const LazyCart = lazy(() => import("@/components/cart/Cart"));

const CartPage = () => {
  return (
    // Wrap the component in Suspense and specify a fallback (loading) component to be shown while the Cart component is loading.
    <Suspense fallback={<div className="text-center text-32  text-black"><Loader/></div>}>
      <LazyCart />
    </Suspense>
  );
};

export default CartPage;
