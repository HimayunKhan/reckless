"use client";

import React, { useContext, useEffect } from "react";
import UserAddresses from "../user/UserAddresses";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import { motion } from "framer-motion";
import Image from "next/image";

const Profile = ({ addresses }) => {
  const { user,updated,setUpdated } = useContext(AuthContext);


  useEffect(()=>{
   if(updated){
    window.location.reload()
    setUpdated(false)

   }
  },[updated])

  return (
    <>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <figure className="flex items-start sm:items-center bg-color1 shadow-test2Shadow rounded-md p-4">
          <div className="relative">
            <Image
              className="w-16 h-16 rounded-full mr-4"
              src={user?.avatar?.url || user?.image || "/images/default.png"}
              alt="user_profilepic"
              width={40}
              height={40}
            />
          </div>
          <figcaption>
            <h5 className="font-semibold text-lg">{user?.name}</h5>
            <p>
              <b>Email:</b> {user?.email} | <b>Joined On:</b>
              {user?.createdAt?.substring(0, 10)}
            </p>
          </figcaption>
        </figure>
      </motion.div>

      <hr className="my-4  border-3 border-solid border-gray-300" />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <UserAddresses addresses={addresses} />
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        <Link href={"/address/new"}>
          <button className="px-4 py-2 inline-block text-black border border-black rounded-lg hover:bg-gray-100 shadow-test2Shadow bg-color1">
            Add new address
          </button>
        </Link>

        <hr className="my-4" />
      </motion.div>
    </>
  );
};

export default Profile;
