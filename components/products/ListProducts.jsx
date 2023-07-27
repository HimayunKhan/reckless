// "use client";

// import React from "react";
// import CustomPagination from "../layouts/CustomPagination";
// import Filters from "../layouts/Filters";
// import ProductItem from "./ProductItem";

// const ListProducts = ({ data }) => {

//   return (
//     <section className="py-12 bg-[#F5F5F3]">
//       <div className="container max-w-screen-xl mx-auto px-4">
//         <div className="flex flex-col md:flex-row -mx-4">
//           <Filters />

//           <main className="md:w-2/3 lg:w-3/4 px-3">
//             {data?.data?.products?.map((product) => (
//               <ProductItem key={product?._id} product={product} />
//             ))}

//             <CustomPagination
//               resPerPage={data?.data?.resPerPage}
//               productsCount={data?.data?.filteredProductsCount}
//             />
//           </main>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ListProducts;

"use client";

import React from "react";
import CustomPagination from "../layouts/CustomPagination";
import Filters from "../layouts/Filters";
import ProductItem from "./ProductItem";
import { BsDatabaseFill } from "react-icons/bs";

const ListProducts = ({ data }) => {
  return (
    <section className="py-12 bg-[#F5F5F3]">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Filters />

          <main className="md:w-2/3 lg:w-3/4 px-3">
            {data?.map((product) => (
              <ProductItem key={product?._id} product={product} />
            ))}

            <CustomPagination
              // resPerPage={data?.data?.resPerPage}
              resPerPage={3}
              productsCount={2}
              // productsCount={data?.data?.filteredProductsCount}
            />
          </main>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ListProducts);
