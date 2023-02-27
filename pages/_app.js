import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import CartState from "@/context/cart/CartState";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const [key, setKey] = useState();
  const router = useRouter();

  useEffect(() => {
    // loading bar events
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    setKey(Math.random())
  }, []);

  return (
    <>
      <CartState>
        <LoadingBar color="#db2777" progress={progress} waitingTime={400} onLoaderFinished={() => setProgress(0)} />
        {key && <Navbar/>}
        <Component setKey={setKey} {...pageProps} />
        <Footer />
      </CartState>
    </>
  );
}
