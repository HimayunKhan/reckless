"use client"

import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "@/context/AuthContext";
import StarRatings from "react-star-ratings";

const Filters = () => {
  const { filteredProducts, setFilteredProducts, AllProductsData } =
    useContext(AuthContext);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState("");
  const [selectedRatings, setSelectedRatings] = useState("");

  // Use useRef to store the previous filtered state
  const prevFilteredProducts = useRef(filteredProducts);

  useEffect(() => {
    // Perform the filtering logic here based on the provided criteria
    const filteredResults = AllProductsData.filter((product) => {
      const withinPriceRange =
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice);

      const matchesCategory =
        !category || product.category.toLowerCase() === category.toLowerCase();

      const matchesRatings =
        !selectedRatings || product.ratings >= selectedRatings;

      return withinPriceRange && matchesCategory && matchesRatings;
    });

    setFilteredProducts(filteredResults);

    // Update the previous filtered state whenever new filters are applied
    prevFilteredProducts.current = filteredResults;
  }, [
    minPrice,
    maxPrice,
    category,
    ratings,
    selectedRatings,
    AllProductsData,
    setFilteredProducts,
  ]);

  const handleResetFilters = () => {
    // Reset all filters and revert to the previous filtered state
    setMinPrice("");
    setMaxPrice("");
    setCategory("");
    setRatings("");
    setSelectedRatings("");
    setFilteredProducts(prevFilteredProducts.current);
  };

// Rest of the code remains the same
  // ...

  return (
    <div className="bg-gray-100 p-4 shadow-md rounded-md">
      <h3 className="text-lg font-semibold mb-2">Filter Products</h3>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
        />

        {/* category */}
        <div className="col-span-2">
          <p className="font-semibold">Category</p>
          <div className="flex flex-col">
            {/* Category radio buttons as before */}

            <label className="">
              <input
                type="radio"
                name="category"
                value=""
                checked={!category}
                onChange={() => setCategory("")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2">All</span>
            </label>
            <label className="">
              <input
                type="radio"
                name="category"
                value="Electronics"
                checked={category === "Electronics"}
                onChange={() => setCategory("Electronics")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Electronics</span>
            </label>
            <label className="">
              <input
                type="radio"
                name="category"
                value="Headphones"
                checked={category === "Headphones"}
                onChange={() => setCategory("Headphones")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Headphones</span>
            </label>

            <label className="">
              <input
                type="radio"
                name="category"
                value="Laptops"
                checked={category === "Laptops"}
                onChange={() => setCategory("Laptops")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Laptops</span>
            </label>

            {/* Add other category radio buttons as needed */}
          </div>
        </div>

        {/* Ratings */}
        <div>
          <p className="font-semibold mb-2">Ratings</p>
          <ul className="">
            <li>
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    name="ratings"
                    type="radio"
                    value={rating}
                    checked={selectedRatings === rating}
                    className="h-4 w-4"
                    onChange={() => setSelectedRatings(rating)}
                  />
                  <span className="ml-2 text-gray-500">
                    {" "}
                    <StarRatings
                      rating={rating}
                      starRatedColor="#ffb829"
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="2px"
                      name="rating"
                    />{" "}
                  </span>
                </label>
              ))}
            </li>
          </ul>
        </div>
      </div>

      <button
        onClick={handleResetFilters}
        className="bg-red-500 hover:bg-red-600 text-white mt-4 px-4 py-2 rounded-md"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
