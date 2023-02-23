import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import CartState from "@/context/cart/CartState";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  // const [cart, setCart] = useState({});
  // const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    // loading bar events
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  }, []);

  // const saveCart = (myCart) => {
  //   localStorage.setItem("cart", myCart);
  // };

  // const addToCart = (itemCode, name, qty, size, variant, price) => {
  //   let newCart = cart;
  //   if (itemCode in newCart) {
  //     newCart[itemCode].qty += qty;
  //   } else {
  //     newCart[itemCode] = { qty: 1, size, variant, price, name };
  //   }
  //   saveCart(newCart);
  //   setCart(newCart);
  // };

  // const removeFromCart = (itemCode, name, qty, size, variant, price) => {
  //   let newCart = cart;
  //   if (itemCode in newCart) {
  //     newCart[itemCode].qty -= qty;
  //   }
  //   if (newCart[itemCode].qty <= 0) {
  //     delete newCart[itemCode];
  //   }
  //   saveCart(newCart);
  //   setCart(newCart);
  // };

  // const clearCart = () => {
  //   setCart({});
  //   saveCart({});
  // };

  return (
    <>
      <CartState>
        <LoadingBar color="#db2777" progress={progress} waitingTime={400} onLoaderFinished={() => setProgress(0)} />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </CartState>
    </>
  );
}
