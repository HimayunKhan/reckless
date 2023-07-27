"use client";

import React, { useContext, useEffect } from "react";
import OrderItem from "./OrderItem";
import CustomPagination from "../layouts/CustomPagination";
import CartContext from "@/context/CartContext";
import { useSearchParams, useRouter } from "next/navigation";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const ListOrders = ({ orders }) => {
  const { clearCart } = useContext(CartContext);
  const params = useSearchParams();
  const router = useRouter();
  const orderSuccess = params.get("order_success");

  useEffect(() => {
    if (orderSuccess === "true") {
      clearCart();
      router.replace("/me/orders");
    }
  }, []);

  return (
    <>
      <h3 className="text-3xl font-semibold mb-5">YOUR ORDERS:</h3>
      {orders?.orders?.length == 0 ? (
        <>
          <div>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
            >
              <div>
                <Image
                  className="w-80 rounded-lg p-4 mx-auto"
                  src="/images/assets/images/emptyCart.png"
                  alt="emptyCart"
                  width={200}
                  height={200}
                />
              </div>
              <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
                <h1 className="font-titleFont text-xl font-bold uppercase text-center">
                  No orders yet
                  <br /> Your order history feels lonely.
                </h1>
                <p className="text-sm text-center px-10 -mt-2">
                  Give it purpose - <br /> fill it with books, electronics,
                  videos, etc. and make it happy.
                </p>
                <Link href="/">
                  <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      ) : (
        <>
          <div>
            {orders?.orders?.map((order) => (
              <OrderItem key={order?._id} order={order} />
            ))}

            <CustomPagination
              resPerPage={orders?.resPerPage}
              productsCount={orders?.ordersCount}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ListOrders;
