// import Cart from "@/components/cart/Cart";
// import React from "react";

// const CartPage = () => {
//   return <Cart />;
// };

// export default CartPage;



import Loader from "@/components/layouts/Loader";
import React, { Suspense, lazy } from "react";

const LazyCart = lazy(() => import("@/components/cart/Cart"));

const CartPage = () => {
  return (
    <Suspense fallback={<div className="text-center text-32  text-black"><Loader/></div>}>
      <LazyCart />
    </Suspense>
  );
};

export default CartPage;
