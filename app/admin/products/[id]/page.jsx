// "use client";
// import React, { useState, useEffect, Suspense } from "react";
// import axios from "axios";
// import Loader from "@/components/layouts/Loader";

// const UpdateProduct = React.lazy(() =>
//   import("@/components/admin/UpdateProduct")
// );

// const getProduct = async (id) => {
//   try {
//     const { data } = await axios.get(
//       `${process.env.API_URL}/api/admin/products/${id}`
//     );
//     return data?.data;
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return null;
//   }
// };

// const HomePage = ({ params }) => {
//   const [loading, setLoading] = useState(true);
//   const [productData, setProductData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getProduct(params.id);
//       setLoading(false);
//       setProductData(data);
//     };
//     fetchData();
//   }, [params.id]);

//   return (
//     <Suspense
//       fallback={
//         <div className="text-center text-32  text-black">
//           <Loader />
//         </div>
//       }
//     >
//       {loading ? (
//         <div>Loading...</div>
//       ) : productData ? (
//         <UpdateProduct data={productData} />
//       ) : (
//         <div>No product found.</div>
//       )}
//     </Suspense>
//   );
// };

// export default HomePage;
