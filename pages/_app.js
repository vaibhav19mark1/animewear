import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState,useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const router=useRouter()

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  }, []);

  return (
    <>
      <LoadingBar color="#db2777" progress={progress} waitingTime={400} onLoaderFinished={() => setProgress(0)} />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
