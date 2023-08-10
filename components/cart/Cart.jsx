"use client";

import React, { useContext } from "react";
import CartContext from "@/context/CartContext";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const Cart = () => {
  const { addItemToCart, deleteItemFromCart, cart, saveOnCheckout } =
    useContext(CartContext);

  const increaseQty = (cartItem) => {
    const newQty = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQty };
    if (newQty > Number(cartItem.stock)) return;
    addItemToCart(item);
  };

  const decreaseQty = (cartItem) => {
    const newQty = cartItem?.quantity - 1;
    const item = { ...cartItem, quantity: newQty };
    if (newQty <= 0) return;
    addItemToCart(item);
  };

  const amountWithoutTax = cart?.cartItems
    ?.reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  const taxAmount = (amountWithoutTax * 0.15).toFixed(2);
  const totalAmount = (Number(amountWithoutTax) + Number(taxAmount)).toFixed(2);

  const checkoutHandler = () => {
    const data = {
      amount: amountWithoutTax,
      tax: taxAmount,
      totalAmount,
    };

    saveOnCheckout(data);
  };

  return (
    <>
      <section className="py-5 sm:py-7 bg-[#F5F5F3] ">
        <div className="container max-w-screen-xl mx-auto ">
          {cart?.cartItems?.length == 0 ? (
            <>
              <h2 className="text-3xl font-semibold mb-2 pl-4">
                {cart?.cartItems?.length || 0} Item(s) in Cart
              </h2>
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
                    width={80}
                    height={80}
                  />
                </div>
                <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
                  <h1 className="font-titleFont text-xl font-bold uppercase">
                    Your Cart feels lonely.
                  </h1>
                  <p className="text-sm text-center px-10 -mt-2">
                    Your Shopping cart lives to serve. Give it purpose - fill it
                    with books, electronics, videos, etc. and make it happy.
                  </p>
                  <Link href="/">
                    <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-semibold mb-2 pl-8">
                {cart?.cartItems?.length || 0} Item(s) in Cart
              </h2>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col mdl:flex-row justify-center items-center  pb-20"
              >
              <section className="py-10">
                <div className="container max-w-screen-xl mx-auto px-4 ">
                  <div className="flex flex-col md:flex-row gap-4">
                    <main className="md:w-3/4 ">
                      <article className="border border-gray-200  shadow-sm rounded mb-5 p-3 lg:p-5 shadow-test2Shadow bg-color1">
                        {cart?.cartItems?.map((cartItem) => (
                          <div key={cartItem?.image}>
                            <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                              <div className="w-full lg:w-2/5 xl:w-2/4">
                                <figure className="flex leading-5">
                                  <div>
                                    <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                      <Image
                                        className="w-16 h-16"
                                        src={cartItem?.image}
                                        alt={cartItem?.name}
                                        height={40}
                                        width={40}
                                      />
                                    </div>
                                  </div>
                                  <figcaption className="ml-3">
                                    <p>
                                      <Link
                                        href={`/product/${cartItem?.product}`}
                                        className="hover:text-customGold"
                                      >
                                        {cartItem.name}
                                      </Link>
                                    </p>
                                    <p className="mt-1 text-gray-400">
                                      {" "}
                                      Seller: {cartItem.seller}
                                    </p>
                                  </figcaption>
                                </figure>
                              </div>
                              <div className="w-24">
                                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                  <button
                                    data-action="decrement"
                                    className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                    onClick={() => decreaseQty(cartItem)}
                                  >
                                    <span className="m-auto text-2xl font-thin">
                                      −
                                    </span>
                                  </button>
                                  <input
                                    type="number"
                                    className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none custom-input-number"
                                    name="custom-input-number"
                                    value={cartItem.quantity}
                                    readOnly
                                  ></input>
                                  <button
                                    data-action="increment"
                                    className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                    onClick={() => increaseQty(cartItem)}
                                  >
                                    <span className="m-auto text-2xl font-thin">
                                      +
                                    </span>
                                  </button>
                                </div>
                              </div>
                              <div>
                                <div className="leading-5">
                                  <p className="font-semibold not-italic">
                                    $
                                    {(
                                      cartItem.price * cartItem.quantity
                                    ).toFixed(2)}
                                  </p>
                                  <small className="text-gray-400">
                                    {" "}
                                    ${cartItem.price} / per item{" "}
                                  </small>
                                </div>
                              </div>
                              <div className="flex-auto">
                                <div className="float-right">
                                  <a
                                    className="px-4 py-2 inline-block text-red-600 bg-color1 shadow-sm border border-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
                                    onClick={() =>
                                      deleteItemFromCart(cartItem?.product)
                                    }
                                  >
                                    Remove
                                  </a>
                                </div>
                              </div>
                            </div>

                            <hr className="my-4" />
                          </div>
                        ))}
                      </article>
                    </main>
                    <aside className="md:w-1/4 ">
                      <article className="border border-gray-200 bg-color1 shadow-sm rounded mb-5 p-3 lg:p-5 shadow-test2Shadow">
                        <ul className="mb-5">
                          <li className="flex justify-between text-gray-600  mb-1">
                            <span>Amount before Tax:</span>
                            <span>${amountWithoutTax}</span>
                          </li>
                          <li className="flex justify-between text-gray-600  mb-1">
                            <span>Total Units:</span>
                            <span className="text-green-500">
                              {cart?.cartItems?.reduce(
                                (acc, item) => acc + item.quantity,
                                0
                              )}{" "}
                              (Units)
                            </span>
                          </li>
                          <li className="flex justify-between text-gray-600  mb-1">
                            <span>TAX:</span>
                            <span>${taxAmount}</span>
                          </li>
                          <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                            <span>Total price:</span>
                            <span>${totalAmount}</span>
                          </li>
                        </ul>

                        <a
                          className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-black border border-transparent rounded-md hover:bg-customGold cursor-pointer"
                          onClick={checkoutHandler}
                        >
                          Continue
                        </a>

                        <Link
                          href="/"
                          className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-black bg-color1 shadow-sm border border-gray-200 rounded-md hover:bg-gray-300"
                        >
                          Back to shop
                        </Link>
                      </article>
                    </aside>
                  </div>
                </div>
              </section>
              </motion.div>
            </>
          )}
        </div>
      </section>

      
    </>
  );
};

export default Cart;
