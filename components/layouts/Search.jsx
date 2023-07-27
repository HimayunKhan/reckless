"use client";
import React, { useContext, useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import SearchProducts from "./SearchProducts";

const Search = () => {
  const {AllProductsData } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

 
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = AllProductsData.filter((item) =>
      item.name.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <>
      <div className="flex  w-[50%]  h-10 hidden md:inline-flex items-center justify-between relative">
        <input
          onChange={handleSearch}
          value={searchQuery}
          className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
          type="text"
          placeholder="Search "
        />
        <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
          <HiOutlineSearch />
        </span>
        {/* ========== Searchfield ========== */}
        {searchQuery && (
          <div className="absolute z-10 left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
            {filteredProducts.length > 0 ? (
              <>
                {searchQuery &&
                  filteredProducts.map((item) => (
                    <Link
                      key={item._id}
                      className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                      href={`${process.env.API_URL}/product/${item._id}`}
                      onClick={() => setSearchQuery("")}
                    >
                      <SearchProducts item={item} />
                    </Link>
                  ))}
              </>
            ) : (
              <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
                <p className="text-xl font-semibold animate-bounce">
                  Nothing is matches with your search keywords. Please try
                  again!
                </p>
              </div>
            )}
          </div>
        )}
        {/* ========== Searchfield ========== */}
      </div>
    </>
  );
};

export default Search;
