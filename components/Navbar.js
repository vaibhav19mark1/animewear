import { useCartContext } from "@/context/cart/cartContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle, MdRemoveShoppingCart } from "react-icons/md";

const Navbar = () => {
  const { cart, addToCart, removeFromCart, clearCart, subTotal } = useCartContext();
  const [sideCart, setSideCart] = useState(false);

  const toggleCart = () => {
    setSideCart(!sideCart);
  };

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
        <AiOutlineShoppingCart className="text-xl md:text-3xl" onClick={toggleCart} />
      </div>

      {/* shopping cart */}

      <div className={`absolute top-0 ${sideCart ? "right-0" : "-right-96"} w-72 md:w-96 h-[100vh] bg-white px-8 py-10 overflow-y-scroll shadow-xl transition-all`}>
        <h2 className="text-xl text-center font-bold mb-4">Shopping Cart</h2>
        <span className="text-2xl absolute top-5 right-2 text-red-600 cursor-pointer" onClick={toggleCart}>
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold ml-2">
          {Object.keys(cart).length == 0 && <div className="my-4 text-center font-semibold">Your Cart is Empty!</div>}
          {Object.keys(cart).map((itemCode) => {
            return (
              <li key={itemCode}>
                <div className="flex my-5">
                  <div className="w-3/4 font-semibold">{cart[itemCode].name}({cart[itemCode].size}/{cart[itemCode].variant})</div>
                  <div className="w-1/4 flex items-center justify-between font-semibold text-lg">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(itemCode, 1);
                      }}
                      className="text-red-500 cursor-pointer"
                    />
                    <span>{cart[itemCode].qty}</span>
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(itemCode, cart[itemCode].name, 1, cart[itemCode].size, cart[itemCode].variant, cart[itemCode].price);
                      }}
                      className="text-red-500 cursor-pointer"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="font-bold my-2">SubTotal: {subTotal}</div>
        <div className="flex justify-center my-2">
          <Link href={"/checkout"}>
            <button className="disabled:bg-red-300 flex mr-2 mt-2 text-white m-auto bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm">
              <BsFillBagCheckFill className="m-1" />
              CheckOut
            </button>
          </Link>
          <Link href={"#"}>
            <button onClick={clearCart} className="disabled:bg-red-300 flex mr-2 mt-2 text-white m-auto bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm">
              <MdRemoveShoppingCart className="m-1" />
              Clear Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
