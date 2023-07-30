import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const FooterBottom = () => {
  return (
    <div className="w-full bg-black">
      <div className="max-w-container mx-auto border-t-[1px] pt-5 ">
        <p className="text-titleFont font-normal text-center text-customGold flex md:items-center justify-center  duration-200 text-sm">
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center text-customGold hidden md:inline-flex">
            <AiOutlineCopyright />
          </span>
          Copyright 2023 | chokha shopping | All Rights Reserved |
          <a href="https://reactbd.com/" target="_blank" rel="noreferrer">
            <span className="ml-1 font-medium group-hover:text-primeColor">
              Powered by chokha.com
            </span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
