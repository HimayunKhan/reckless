/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1440px",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        bodyFont: ["DM Sans", "sans-serif"],
        titleFont: ["Poppins", "sans-serif"],
      },
      colors: {
        primeColor: "#262626",
        lightText: "#6D6D6D",
        customGold: "#ddb148",
        color1:"#F5F5F3",
      },
      boxShadow: {
        // testShadow: "0px 0px 54px -13px rgba(0,0,0,0.7)",
        // test2Shadow:"  rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
      },
    },
  },
  plugins: [],
};
