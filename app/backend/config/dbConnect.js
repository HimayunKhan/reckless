import mongoose from "mongoose";

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB_URI);
};

export default dbConnect;


// import mongoose from "mongoose";

// const dbConnect = () => {
//   if (mongoose.connection.readyState >= 1) {
//     console.log("Database connection already established");
//     return;
//   }

//   mongoose.set("strictQuery", false);
//   mongoose.connect(process.env.DB_URI, (error) => {
//     if (error) {
//       console.error("Failed to connect to the database:", error);
//     } else {
//       console.log("Database connected successfully");
//     }
//   });
// };

// export default dbConnect;
