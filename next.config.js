/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URI:"",
    API_URL: "http://localhost:3000",
    GOOGLE_CLIENT_ID:""   ,
    GOOGLE_CLIENT_SECRET: "",

    MONGODB_URI:"",

    NEXTAUTH_SECRET: "",

    NEXTAUTH_URL: "http://localhost:3000",

    CLOUDINARY_CLOUD_NAME: "",
    CLOUDINARY_API_KEY: "",
    CLOUDINARY_API_SECRET: "",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
