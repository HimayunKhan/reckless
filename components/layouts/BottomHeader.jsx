import { LuMenu } from "react-icons/lu";
import { signOut } from "next-auth/react";
import Link from "next/link";

const BottomHeader = () => {
  //   const { userInfo } = useSelector(()) => state.next);
  const handleSignOut = () => {
    signOut();
  };
  return (
    <div className="w-full h-10 bg-black text-sm text-white px-4 flex justify-center items-center">
      <p className="flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <LuMenu className="text-xl" /> All
      </p>
      <Link href={`/products`}>
        <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
          Todays Deals
        </p>
      </Link>
      <Link href={`/Aboutus`}>
        <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
          Customer Service
        </p>
      </Link>

      <Link href={`/Contactus`}>
        <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
          Contact Us
        </p>
      </Link>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Gift Cards
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Sell
      </p>

      {/* <button
          onClick={handleSignOut}
          className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-red-600 hover:text-red-400 text-amazon_yellow cursor-pointer duration-300"
        >
          Sign Out
        </button> */}
    </div>
  );
};

export default BottomHeader;
