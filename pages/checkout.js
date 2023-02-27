import { useCartContext } from "@/context/cart/cartContext";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [user, setUser] = useState({ value: null });
  const router = useRouter();
  const { cart, addToCart, removeFromCart, subTotal } = useCartContext();

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser && myuser.token) {
      setUser(myuser);
      setEmail(myuser.email);
      fetchData(myuser.token);
    }
  }, []);

  const fetchData = async (token) => {
    let data = { token: token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    setName(res.name);
    setAddress(res.address);
    setPhone(res.phone);
    setPincode(res.pincode);
    getPincode(res.pincode);
  };

  const getPincode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setCity(pinJson[pin][0]);
      setState(pinJson[pin][1]);
    } else {
      setCity("");
      setState("");
    }
  };

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        getPincode(e.target.value);
      } else {
        setCity("");
        setState("");
      }
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    }
    if (name.length > 3 && email.length > 3 && phone.length > 3 && pincode.length > 3 && address.length > 3) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleOrder = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    const data = { cart, oid, email, subTotal, address, name, pincode, phone, city, state };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    if (response.success) {
      router.push(`/order?id=${response.orderId}`);
    } else {
      toast.error(response.error, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <div className="container m-auto min-h-screen">
        <ToastContainer position="top-left" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
        <div className="mx-4">
          <h2 className="font-semibold text-xl">1. Delivery Details</h2>
          <div className="flex my-4">
            <div className="px-2 w-1/2">
              <div>
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                  Name
                </label>
                <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div>
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                  Email
                </label>
                {user && user.token ? <input value={user.email} readOnly={true} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
              </div>
            </div>
          </div>
          <div className="flex my-4">
            <div className="px-2 w-full">
              <div>
                <label htmlFor="address" className="leading-7 text-sm text-gray-600">
                  Address
                </label>
                <textarea onChange={handleChange} value={address} type="text" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
          </div>
          <div className="flex my-4">
            <div className="px-2 w-1/2">
              <div>
                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                  Phone
                </label>
                <input onChange={handleChange} value={phone} type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div>
                <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
                  PIN Code
                </label>
                <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
          </div>
          <div className="flex my-4">
            <div className="px-2 w-1/2">
              <div>
                <label htmlFor="state" className="leading-7 text-sm text-gray-600">
                  State
                </label>
                <input value={state} readOnly={true} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="px-2 w-1/2">
              <div>
                <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                  City
                </label>
                <input value={city} readOnly={true} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4">
          <h2 className="font-semibold text-xl">2. Review Cart & Pay</h2>
          <div className="sideCart bg-red-100 p-6 m-2">
            <ol className="list-decimal font-semibold ml-2">
              {Object.keys(cart).length == 0 && <div className="my-4 text-center font-semibold">Your Cart is Empty!</div>}
              {Object.keys(cart).map((itemCode) => {
                return (
                  <li key={itemCode}>
                    <div className="flex justify-between md:justify-start my-5">
                      <div className="md:w-1/5 font-semibold">
                        {cart[itemCode].name}({cart[itemCode].size}/{cart[itemCode].variant})
                      </div>
                      <div className="flex items-center justify-between font-semibold text-lg">
                        <AiFillMinusCircle
                          onClick={() => {
                            removeFromCart(itemCode, 1);
                          }}
                          className="text-red-500 mx-2 cursor-pointer"
                        />
                        <span>{cart[itemCode].qty}</span>
                        <AiFillPlusCircle
                          onClick={() => {
                            addToCart(itemCode, cart[itemCode].name, 1, cart[itemCode].size, cart[itemCode].variant, cart[itemCode].price);
                          }}
                          className="text-red-500 mx-2 cursor-pointer"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
            <span className="total">SubTotal: ₹{subTotal}</span>
          </div>
        </div>
        <div className="mx-8">
          {subTotal !== 0 && (
            <Link href={"/checkout"}>
              <button disabled={disabled} onClick={handleOrder} className="disabled:bg-red-300 text-white m-auto bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm">
                Pay ₹{subTotal}
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
