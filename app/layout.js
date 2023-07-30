import Header from "@/components/layouts/Header";
import "./globals.css";
import { GlobalProvider } from "./GlobalProvider";
import Providers from "@/components/Providers";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F5F5F3]">
        <Providers>
          <GlobalProvider>
            <Header />
            {children}
            <Footer />
          </GlobalProvider>
        </Providers>
      </body>
    </html>
  );
}
