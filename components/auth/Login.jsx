"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import Image from "next/image";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (data?.error) {
      toast.error("Invalid Email or Password");
      setEmail("");
      setPassword("");
    }

    if (data?.error == null) {
      window.location.replace("/me");
      toast.success("Login successfull");
    }
  };

  const submitGoogle = async (e) => {
    e.preventDefault();

    try {
      await signIn("google", { callbackUrl: "http://localhost:3000/me" });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="  bg-[#F5F5F3] w-full md:w-[40%] my-10 mx-4 p-4 md:p-7   rounded-lg  ">
        <form onSubmit={submitHandler}>
          <h2 className="mb-5 text-center text-3xl font-bold ">LOGIN</h2>

          <div className="mb-4">
            <label className="block mb-1"> Email </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1"> Password </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="password"
              placeholder="Type your password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-black border border-transparent rounded-md hover:bg-[#ddb148]"
          >
            Login
          </button>

          <hr className="mt-4" />
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
          <p className="text-center mt-5">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#ddb148]">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
