import Head from "next/head";
import Link from "next/link";
import { RiTShirtAirLine } from "react-icons/ri";
import { BsTruck } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>AnimeWear.com - Wear Yout Anime</title>
        <meta name="description" content="Best anime merchandise" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <div className="w-full h-screen bg-[url('/images/anime.jpg')] bg-cover bg-center">
        <div className="w-full h-screen bg-black/50 backdrop-brightness-75 flex flex-col pt-44 text-center ">
          <p className="text-white font-bold text-6xl md:text-8xl font-manga">AnimeWear</p>
          <p className="text-white font-bold text-lg md:text-2xl">WEAR YOUR ANIME</p>
          <Link href={"/tshirts"}>
            <button className="text-white border-white border md:w-1/5 mx-auto mt-24 p-2 hover:bg-white hover:text-black font-bold text-lg">Shop Now -&gt;</button>
          </Link>
          <p className="text-white font-bold text-2xl mt-2">Shop your favourite anime merchandise</p>
        </div>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Raw Denim Heirloom Man Braid</h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug.</p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-red-500 inline-flex"></div>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-5 flex-shrink-0">
                <RiTShirtAirLine className="text-4xl" />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Breathable Fabric</h2>
                <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-5 flex-shrink-0">
                <BsTruck className="text-4xl" />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Free Delivery</h2>
                <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-5 flex-shrink-0">
                <BiRupee className="text-4xl" />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Affordable Prices</h2>
                <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
              </div>
            </div>
          </div>
          <Link href={"/tshirts"}><button className="flex mx-auto mt-16 text-white bg-red-600 border-0 py-2 px-8 focus:outline-none hover:bg-red-700 rounded text-lg">Shop Now</button></Link>
        </div>
      </section>
    </>
  );
}
