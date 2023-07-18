import Profile from "@/components/auth/Profile";
import axios from "axios";
import React from "react";
import { getSession } from "next-auth/react";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const getAddresses = async () => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
    headers: {
      Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
    },
  });

  return data?.data?.AllAddress;
};

const ProfilePage = async () => {
  const addresses = await getAddresses();

  return <Profile addresses={addresses} />;
};

export default ProfilePage;
