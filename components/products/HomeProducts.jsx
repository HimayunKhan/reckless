import React, { useContext } from "react";
import Image from "next/image";
import { HiShoppingCart } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import CartContext from "@/context/CartContext";

const HomeProducts = ({ data }) => {
  const addtowishlist = () => {};
  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = (_id, name, price, image, stock, seller) => {
    addItemToCart({
      product: _id,
      name: name,
      price: price,
      image: image,
      stock: stock,
      seller: seller,
    });
  };

  return (
    <div className=" w-full px-6  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {data?.map((item) => (
        
        <div
          key={item?._id}
          className="w-full bg-color1 shadow-testShadow text-black border border-gray-300 rounded-lg group overflow-hidden"
        >
          <div className="w-full h-[260px] relative">
            <Link href={`/product/${item?._id}`}>
              <img
                src={item?.images[0]?.url}
                className="w-full h-full object-cover scale-100 hover:scale-90 transition-transform duration-300"
                width={300}
                height={300}
                alt="productImage"
              />
            </Link>
            <div className="w-12 h-24 absolute bottom-20 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300">
              <span
                onClick={() =>
                  addToCartHandler(
                    item?._id,
                    item?.name,
                    item?.price,
                    item?.images[0].url,
                    item?.stock,
                    item?.seller
                  )
                }
                className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
              >
                <HiShoppingCart />
              </span>
              <span
                onClick={addtowishlist}
                className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
              >
                <FaHeart />
              </span>
            </div>

            {
              <p className="absolute bottom-1 bg-customGold rounded-lg right-3 p-4 text-amazon_blue font-medium text-xs tracking-wide animate-bounce">
                !save {item?.price}
              </p>
            }
          </div>
          <hr />
          <div className="px-4 py-3 flex flex-col gap-1">
            <p className="text-xs text-gray-500 tracking-wide">{item?.name}</p>
            <p className="text-base font-medium">{item?.name}</p>
            <p className="flex items-center gap-2">
              <span className="text-sm line-through">{item?.price}</span>
              <span className="text-amazon_blue font-semibold">
                {item?.price}
              </span>
            </p>
            <p className="text-xs text-gray-600 text-justify">
              {item?.description?.substring(0, 120)}...
            </p>
            <button
              onClick={() =>
                addToCartHandler(
                  item?._id,
                  item?.name,
                  item?.price,
                  item?.images[0].url,
                  item?.stock,
                  item?.seller
                )
              }
              className="h-10 font-medium bg-black text-customGold rounded-md hover:bg-customGold hover:text-black duration-300 mt-2"
            >
              add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeProducts;



























// import React, { useContext } from "react";
// import Image from "next/image";
// import { HiShoppingCart } from "react-icons/hi";
// import { FaHeart } from "react-icons/fa";
// import Link from "next/link";
// import CartContext from "@/context/CartContext";

// const HomeProducts = ({ data }) => {
//   const addtowishlist = () => {};
//   const { addItemToCart } = useContext(CartContext);

//   const addToCartHandler = (_id, name, price, image, stock, seller) => {
//     addItemToCart({
//       product: _id,
//       name: name,
//       price: price,
//       image: image,
//       stock: stock,
//       seller: seller,
//     });
//   };

//   return (
//     <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//       {data?.map((item) => (
//       <div
// 	  key={item?._id}
// 	  className="w-full bg-white text-black p-4 border border-gray-300 rounded-lg group relative"
// 	>
// 	  {item?.price && (
// 		<p className="absolute top-0 right-0 z-10 text-amazon_blue font-medium text-xs tracking-wide animate-bounce">
// 		  !save {item?.price}
// 		</p>
// 	  )}
	
// 	  <div className="w-full h-[260px] relative group">
// 		<img
// 		  src={item?.images[0]?.url}
// 		  className="w-full h-full object-cover scale-90 hover:scale-100 transition-transform duration-300"
// 		  width={300}
// 		  height={300}
// 		  alt="productImage"
// 		/>
	
// 		<ul className="w-full h-36 bg-gray-100 absolute bottom-[-170px] flex flex-col items-end justify-center gap-2 font-semibold px-2 border-1 border-r group-hover:bottom-0 duration-700">
// 		  <li className="productli">Compare</li>
// 		  <li className="productli">Compare</li>
// 		  <li className="productli">Compare</li>
// 		  <li className="productli">Compare</li>
// 		</ul>
// 	  </div>
	
// 	  <div className="bg-red-500 px-4 py-3 flex flex-col gap-1">
// 		<p className="text-xs text-gray-500 tracking-wide">{item?.name}</p>
// 		<p className="text-base font-medium">{item?.name}</p>
// 		<p className="flex items-center gap-2">
// 		  <span className="text-sm line-through">{item?.price}</span>
// 		  <span className="text-amazon_blue font-semibold">
// 			{item?.price}
// 		  </span>
// 		</p>
// 		<p className="text-xs text-gray-600 text-justify">
// 		  {item?.description?.substring(0, 150)}
// 		</p>
// 		<button
// 		  onClick={() =>
// 			addToCartHandler(
// 			  item?._id,
// 			  item?.name,
// 			  item?.price,
// 			  item?.images[0].url,
// 			  item?.stock,
// 			  item?.seller
// 			)
// 		  }
// 		  className="h-10 font-medium bg-black text-white rounded-md hover:bg-amazon_yellow hover:text-black duration-300 mt-2"
// 		>
// 		  add to cart
// 		</button>
// 	  </div>
// 	</div>
	
	 
//       ))}
//     </div>
//   );
// };

// export default HomeProducts;
