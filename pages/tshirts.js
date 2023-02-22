import Head from "next/head";
import Link from "next/link";
import React from "react";

const Tshirts = () => {
  return (
    <>
      <Head>
        <title>T-Shirts - AnimeWear</title>
        <meta name="description" content="Best anime tshirts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <div className="min-h-screen">
        <h1 className="text-center m-3 text-2xl md:m-5 md:text-4xl font-semibold">T-Shirts</h1>
        <section>
          <div className="flex flex-wrap justify-center">
            <div className="lg:w-1/5 md:w-1/3 w-1/2 border border-gray-300 md:border-none md:shadow-lg m-0 md:m-5 md:transition md:ease-in-out md:hover:-translate-y-1 md:hover:scale-110 md:duration-300">
              <Link href={"/product/tshirt"} className="block relative h-auto md:h-72 overflow-hidden">
                <img src="https://cdn.shopify.com/s/files/1/0070/1700/5113/products/TSM197RDMN_ecomm-2_600x.jpg?v=1673372769" alt="tshirt-image" className="object-top block" />
              </Link>
              <div className="mt-4 pl-4 pb-4">
                <h2 className="text-gray-900 title-font text-lg font-medium">Title</h2>
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                <div>₹499</div>
                <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <div>
                  <span className="border border-gray-300 px-1 mx-1">L</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/5 md:w-1/3 w-1/2 border border-gray-300 md:border-none md:shadow-lg m-0 md:m-5 md:transition md:ease-in-out md:hover:-translate-y-1 md:hover:scale-110 md:duration-300">
              <Link href={"#"} className="block relative h-auto md:h-72 overflow-hidden">
                <img src="https://cdn.shopify.com/s/files/1/0070/1700/5113/products/TSM197RDMN_ecomm-2_600x.jpg?v=1673372769" alt="tshirt-image" className="object-top block" />
              </Link>
              <div className="mt-4 pl-4 pb-4">
                <h2 className="text-gray-900 title-font text-lg font-medium">Title</h2>
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                <div>₹499</div>
                <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <div>
                  <span className="border border-gray-300 px-1 mx-1">L</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/5 md:w-1/3 w-1/2 border border-gray-300 md:border-none md:shadow-lg m-0 md:m-5 md:transition md:ease-in-out md:hover:-translate-y-1 md:hover:scale-110 md:duration-300">
              <Link href={"#"} className="block relative h-auto md:h-72 overflow-hidden">
                <img src="https://cdn.shopify.com/s/files/1/0070/1700/5113/products/TSM197RDMN_ecomm-2_600x.jpg?v=1673372769" alt="tshirt-image" className="object-top block" />
              </Link>
              <div className="mt-4 pl-4 pb-4">
                <h2 className="text-gray-900 title-font text-lg font-medium">Title</h2>
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                <div>₹499</div>
                <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <div>
                  <span className="border border-gray-300 px-1 mx-1">L</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/5 md:w-1/3 w-1/2 border border-gray-300 md:border-none md:shadow-lg m-0 md:m-5 md:transition md:ease-in-out md:hover:-translate-y-1 md:hover:scale-110 md:duration-300">
              <Link href={"#"} className="block relative h-auto md:h-72 overflow-hidden">
                <img src="https://cdn.shopify.com/s/files/1/0070/1700/5113/products/TSM197RDMN_ecomm-2_600x.jpg?v=1673372769" alt="tshirt-image" className="object-top block" />
              </Link>
              <div className="mt-4 pl-4 pb-4">
                <h2 className="text-gray-900 title-font text-lg font-medium">Title</h2>
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                <div>₹499</div>
                <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <div>
                  <span className="border border-gray-300 px-1 mx-1">L</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Tshirts;
