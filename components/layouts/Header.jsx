"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Search from "./Search";
import Image from "next/image";
import CartContext from "@/context/CartContext";
import { useSession } from "next-auth/react";
import AuthContext from "@/context/AuthContext";
import { FaUserAlt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import FullScreenMobileMenu from "./FullScreenMobileMenu";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const { data } = useSession();
  const [menuopen, setmenuopen] = useState(false);

  useEffect(() => {
    if (data) {
      setUser(data?.user);
    }
  }, [data]);

  const { cart } = useContext(CartContext);
  const cartItems = cart?.cartItems;

  return (
    <>
      {menuopen && <FullScreenMobileMenu setopen={setmenuopen} user={user} />}

      <header className="bg-black py-2 border-b">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="flex-shrink-0 mr-5">
              <a href="/">
                <Image
                  src="/images/chokhaLogo.png"
                  height={100}
                  width={240}
                  alt="chokhaLogo"
                  priority={true}
                  style={{ objectFit: "contain" }}
                />
              </a>
            </div>

            <Search />
            <div className="hidden md:block ml-auto">
              <div className="flex items-center space-x-2 ml-auto ">
                <Link
                  href="/cart"
                >
                  <div>
                    <FaShoppingCart
                      className="text-customGold mr-4"
                      size={40}
                    />
                    {cartItems?.length > 0 && (
                      <span className="absolute  font-titleFont top-6 right-16  text-xs w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white">
                        {cartItems?.length}
                      </span>
                    )}
                  </div>
                </Link>



                {!user ? (
                  <Link
                    href="/login"
                  >
                    <span>
                      <FaUserAlt className="text-customGold " size={35} />
                    </span>
                  </Link>
                ) : (
                  <Link href="/me">
                    <div className="   cursor-pointer ">
                      <Image
                        className="w-10 h-10  rounded-full"
                        src={
                          user?.avatar?.url ||
                          user?.image ||
                          "/images/default.png"
                        }
                        width={40}
                        height={40}
                      />
                      <div className="text-white font-medium"></div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
            <div className="md:hidden ml-2">
              <button
                type="button"
                className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
                onClick={() => setmenuopen(true)}
              >
                <FaBars size="1.5rem" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
