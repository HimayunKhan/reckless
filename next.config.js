/** @type {import('next').NextConfig} */
const nextConfig = {
 
  env: {
    DB_URI:
      "mongodb+srv://chokhaculturalvogue:UhsTTbqVhwWaxZMH@chokha.xjfjj49.mongodb.net/reckless",
    API_URL: "http://localhost:3000",
    GOOGLE_CLIENT_ID:
      "617760392415-ue430qbfqf6ma7l4gsmb3s6hl52eeca1.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",

    MONGODB_URI:
      "mongodb+srv://chokhaculturalvogue:UhsTTbqVhwWaxZMH@chokha.xjfjj49.mongodb.net/reckless",

    NEXTAUTH_SECRET: "bajbsajsjsa1232232111",

    NEXTAUTH_URL: "http://localhost:3000",

    CLOUD_NAME: "dlyoovaha",
    CLOUDINARY_API_KEY: "621888197357198",
    CLOUDINARY_API_SECRET: "ovs_RVZL5aDPiRlDvCYZgXyHaSA",

    STRIPE_PUBLIC_KEY:
      "pk_test_51M9oJ2SHxFudyksWtmmN5NUD9GN9BOoHQhdNJM9Zh4Xv5Jdj3wGosvCb4ofls1r2OaP6rlmIoXgA76XuyybisqCj00urGzLN2y",
    STRIPE_PRIVATE_KEY:
      "sk_test_51M9oJ2SHxFudyksWTS31x3KT6R73fnxertpjhTaG3GUDvQRnz5FnLprLo9exaXSecR9h8Q9vQigUGZIo3HtKNLZH00wh1ruBmX",

    STRIPE_WEBHOOK_SECRET:
      "whsec_64d1f1ba6c0d75b691e1e03feecf6e39db768f13bd6a858afd15115bfcc36744",

    GOOGLE_CLIENT_ID:
      "617760392415-ue430qbfqf6ma7l4gsmb3s6hl52eeca1.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
  },
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
