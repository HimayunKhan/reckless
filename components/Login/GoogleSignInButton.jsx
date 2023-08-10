
"use client"
import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const GoogleSignInButton = () => {

	const router = useRouter();

  const submitGoogle = () => {
    // e.preventDefault();

    signIn("google");
    // router.push("/");
  };
  return (
    <div className="flex justify-center items-center mt-2">
      <button
        onClick={submitGoogle}
        className="  bg-black text-white rounded-lg  p-2 text-[24px] "
      >
        <Image
          src="/images/googleLogo1.png"
          width={40}
          height={40}
          alt="googleLogo"
        />
      </button>
    </div>
  );
};

export default GoogleSignInButton;
