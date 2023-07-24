"use client";

import AuthContext from "@/context/AuthContext";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";
import { motion } from "framer-motion";
const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4 ">
      <ul className="sidebar">
        {user?.role === "admin" && (
          <>
            <li>
              {" "}
              <Link
                href="/admin/products/new"
                className="block bg-black text-customGold px-3 py-2  hover:bg-customGold hover:text-black rounded-md shadow-testShadow mb-2"
              >
                New Product <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/products"
                className="block bg-black text-customGold px-3 py-2  hover:bg-customGold hover:text-black rounded-md shadow-testShadow mb-2"
              >
                All Products <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/orders"
                className="block bg-black text-customGold px-3 py-2  hover:bg-customGold hover:text-black rounded-md shadow-testShadow mb-2"
              >
                All Orders <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/users"
                className="block bg-black text-customGold px-3 py-2  hover:bg-customGold hover:text-black rounded-md shadow-testShadow mb-2"
              >
                All Users <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <hr />
          </>
        )}

        <li>
          {" "}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            // className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
          >
            <Link
              href="/me"
              className="block px-3 py-2  bg-black text-customGold hover:bg-customGold hover:text-black rounded-md shadow-testShadow mb-2"
            >
              Your Profile
            </Link>
          </motion.div>
        </li>
        <li>
          {" "}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            // className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
          >
            <Link
              href="/me/orders"
              className="block px-3 py-2  bg-black text-customGold hover:bg-customGold hover:text-black rounded-md shadow-testShadow mb-2"
            >
              Orders
            </Link>
          </motion.div>
        </li>
        <li>
          {" "}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            // className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
          >
            <Link
              href="/me/update"
              className="block px-3 py-2  bg-black text-customGold hover:bg-customGold hover:text-black rounded-md shadow-testShadow mb-2"
            >
              Update Profile
            </Link>
          </motion.div>
        </li>
        <li>
          {" "}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            // className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
          >
            <Link
              href="/me/update_password"
              className="block px-3 py-2  bg-black text-customGold hover:bg-customGold hover:text-black rounded-md shadow-testShadow mb-2"
            >
              Update Password
            </Link>
          </motion.div>
        </li>

        <li>
          {" "}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.10 }}
            // className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
          >
            <button
              className=" w-full text-left block px-3 py-2  bg-black text-customGold hover:bg-customGold  hover:text-black rounded-md shadow-testShadow mb-2"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </motion.div>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
