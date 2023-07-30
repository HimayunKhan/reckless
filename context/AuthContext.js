"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { useSession, mutate } from "next-auth/react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);
  const { data: session, update } = useSession();
  const [AllProductsData, setAllProductsData] = useState([]);
  // const [FilteredProducts, setFilteredProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(AllProductsData);

 

  const router = useRouter();

  useEffect(() => {
    // Fetch products data when the component mounts
    allProducts();
  }, []);

  const allProducts = async () => {
    try {
      const data = await axios.get(`${process.env.API_URL}/api/allproducts`);
      setAllProductsData(data?.data?.data);
      setFilteredProducts(data?.data?.data);
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updateProfile = async (formData) => {
    try {
      setLoading(true);

      const { data } = await axios.put(
        `${process.env.API_URL}/api/auth/me`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // if (data) {

      //   setUser(data);
      //   // loadUser();
      //   setLoading(false);
      // }

      if (data) {
        // Update the NextAuth session with the new data

        update({
          ...session,
          user: { ...session.user, ...data },
        });
        setUser(data);
        toast.success("profile updated successfully");
        setLoading(false);
        router.push("/login");
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setError(error);
      toast.error("please try again");
    }
  };

  const registerUser = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/auth/register`,
        // `http://localhost:3000/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      if (data) {
        // setUser(data)
        if (data?.message == "User registered successfully") {
          toast.success("Registration successful");
          router.replace("/login");
        }
        if (data?.error?.message == "Duplicate email entered") {
          toast.error("User already registered");
        }
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const loadUser = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/auth/session?update");

      if (data?.user) {
        setUser(data.user);
        router.replace("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updatePassword = async ({ currentPassword, newPassword }) => {
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/auth/me/update_password`,
        {
          currentPassword,
          newPassword,
        }
      );

      if (data?.success) {
        toast.success("password updated successfully");
        router.replace("/me");
      }
    } catch (error) {
      console.log(error.response);
      toast.error("password updated fail, please try again");
      setError(error?.response?.data?.message);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/admin/users/${id}`,
        {
          userData,
        }
      );

      if (data?.success) {
        setUpdated(true);
        window.location.reload();
        router.replace(`/admin/users/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.API_URL}/api/admin/users/${id}`
      );

      if (data?.success) {
        router.replace(`/admin/users`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const addNewAddress = async (address) => {
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/address`,
        address
      );

      if (data) {
        router.push("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updateAddress = async (id, address) => {
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/address/${id}`,
        address
      );

      if (data?.address) {
        setUpdated(true);
        router.push(`/address/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.API_URL}/api/address/${id}`
      );

      if (data?.success) {
        router.push("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        AllProductsData,
        setAllProductsData,
        allProducts,
        filteredProducts,
        setFilteredProducts,
        error,
        loading,
        updated,
        setUpdated,
        setUser,
        registerUser,
        updateProfile,
        updatePassword,
        updateUser,
        deleteUser,
        addNewAddress,
        updateAddress,
        deleteAddress,

        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
