import React from "react";

const SearchProducts = ({ item }) => {
  return (
    <div className="flex items-center gap-4">
      <img className="w-24" src={item?.images[0]?.url} alt="productImage" />
      <div>
        <p className="text-xs -mb-1">
          {item?.seller}_{item?.category}
        </p>
        <p className="text-lg font-medium">{item.username}</p>
        <p className="text-xs">{item?.description?.substring(0, 100)}</p>
        <p className="text-sm flex items-center gap-1">
          price:{" "}
          <span className="font-semibold">
            {item?.price} 
			{/* <FormattedPrice amount={item?.price} /> */}
          </span>
          {/* <span className="text-gray-600 line-through">
            <FormattedPrice amount={item.oldPrice} />
          </span> */}
        </p>
      </div>
      <div className="flex-1 text-right px-4">
        <p className="text-base font-semibold animate-bounce text-amazon_blue">
          Save 
		  {/* <FormattedPrice amount={item.oldPrice - item.price} /> */}
        </p>
      </div>
    </div>
  );
};

export default SearchProducts;
