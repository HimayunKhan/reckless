"use client";

import React from "react";

import { BsX } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import AuthContext from "@/context/AuthContext";

const FullScreenMobileMenu = ({ setopen, user }) => {
  const router = useRouter();

  const handleLinkClick = (path) => {
    setopen(false);
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-[90] flex flex-col items-center gap-10 bg-dark/80 py-12 text-5xl text-white backdrop-blur-md">
      <div onClick={() => handleLinkClick("/")}>Home</div>
      <div onClick={() => handleLinkClick("/me")}>
        {user ? "profile" : "Login"}
      </div>
      <div onClick={() => handleLinkClick("/blog")} target="_blank">
        Blog
      </div>

      <button
        onClick={() => {
          setopen(false);
        }}
        className="mt-auto flex text-red-500 items-center gap-2 text-2xl"
      >
        Close <BsX />
      </button>
    </div>
  );
};

export default FullScreenMobileMenu;
