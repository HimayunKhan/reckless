"use client";

import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Register = () => {
  const { error, registerUser, clearErrors } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router=useRouter()

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();

    registerUser({ name, email, password });
    toast.success("signup successful")
    router.push("/login")

  };

  return (
    <div className="flex justify-center">
    <div
      // style={{ maxWidth: "480px" }}
      className="  bg-[#F5F5F3] w-full md:w-[40%] my-10 mx-4 p-4 md:p-7   rounded-lg  shadow-testShadow"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-center text-3xl font-bold">SIGN UP</h2>

        <div className="mb-4">
          <label className="block mb-1"> Full Name </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
          className="my-2 px-4 py-2 text-center w-full inline-block text-customGold bg-black border border-transparent rounded-md hover:bg-customGold hover:text-black"
        >
          Register
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          Already have an account?
          <Link href="/login" className="text-customGold">
            &nbsp;Sign in
          </Link>
        </p>
      </form>
    </div>
    </div>
  );
};

export default Register;
