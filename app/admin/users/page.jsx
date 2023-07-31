import axios from "axios";
import React, { Suspense } from "react";

import { cookies } from "next/headers";
import queryString from "query-string";
import Users from "@/components/admin/Users";
import Loader from "@/components/layouts/Loader";

const getUsers = async (searchParams) => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/admin/users?${searchQuery}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );
  return data;
};

const AdminUsersPage = async ({ searchParams }) => {
  const users = await getUsers(searchParams);

  return (
    <Suspense
    fallback={
      <div className="text-center text-32  text-black">
          <Loader />
        </div>
      }
      >
       <Users data={users} />;
    </Suspense>
  );
};

export default AdminUsersPage;
