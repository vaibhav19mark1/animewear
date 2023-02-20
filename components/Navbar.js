import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="flex flex-col pb-4 md:pb-0 md:flex-row md:justify-start justify-center items-center z-10 shadow-lg sticky bg-white top-0 backdrop-blur-sm">
      <div className="mr-auto md:mx-5">
        <Link href={"/"}>
          <Image src={"/logo-red.svg"} alt="logo" width={200} height={40} />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold md:text-md">
          <Link href={"/tshirts"}>
            <li className="hover:text-red-700">Tshirts</li>
          </Link>
          <Link href={"/hoodies"}>
            <li className="hover:text-red-700">Hoodies</li>
          </Link>
          <Link href={"/bags"}>
            <li className="hover:text-red-700">Bags</li>
          </Link>
        </ul>
      </div>
      <div className="cart absolute items-center right-0 top-4 md:top-3 mx-5 cursor-pointer flex">
        <Link href={"/"}>
          <button className="bg-red-600 hover:bg-red-700 text-sm text-white mx-2 px-2 py-1 rounded-md">Login</button>
        </Link>

        <MdAccountCircle className="text-xl md:text-3xl mx-2" />
        <AiOutlineShoppingCart className="text-xl md:text-3xl" />
      </div>
    </div>
  );
};

export default Navbar;
