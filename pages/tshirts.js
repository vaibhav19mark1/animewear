import Product from "@/models/Product";
import mongoose from "mongoose";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Tshirts = ({ tshirts }) => {
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
            {Object.keys(tshirts).map((item) => {
              return (
                <div key={tshirts[item]._id} className="lg:w-1/5 md:w-1/3 w-1/2 border border-gray-300 md:border-none md:shadow-lg m-0 md:m-5 md:transition md:ease-in-out md:hover:-translate-y-1 md:hover:scale-110 md:duration-300">
                  <Link href={`/product/${tshirts[item].slug}`} className="block relative h-auto md:h-72 overflow-hidden">
                    <img src={tshirts[item].imageUrl} alt="tshirt-image" className="object-top block" />
                  </Link>
                  <div className="mt-4 pl-4 pb-4">
                    <h2 className="text-gray-500 text-xs tracking-widest title-font mb-1">Tshirt </h2>
                    <h3 className="text-gray-900 title-font text-lg font-medium">{tshirts[item].title} </h3>
                    <div>₹{tshirts[item].price} </div>
                    <div className="mt-1">
                      {tshirts[item].size.includes("S") && <span className="border border-gray-300 px-1 mx-1">S</span>}
                      {tshirts[item].size.includes("M") && <span className="border border-gray-300 px-1 mx-1">M</span>}
                      {tshirts[item].size.includes("L") && <span className="border border-gray-300 px-1 mx-1">L</span>}
                      {tshirts[item].size.includes("XL") && <span className="border border-gray-300 px-1 mx-1">XL</span>}
                      {tshirts[item].size.includes("XXL") && <span className="border border-gray-300 px-1 mx-1">XXL</span>}
                    </div>
                    <div className="mt-1">
                      {tshirts[item].color.includes("red") && <button className="border-2 border-gray-300 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {tshirts[item].color.includes("yellow") && <button className="border-2 border-gray-300 ml-1 bg-yellow-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {tshirts[item].color.includes("green") && <button className="border-2 border-gray-300 ml-1 bg-green-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {tshirts[item].color.includes("black") && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                      {tshirts[item].color.includes("blue") && <button className="border-2 border-gray-300 ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Tshirts;

export async function getServerSideProps() {
  mongoose.set("strictQuery", true);
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "tshirt" });
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
        tshirts[item.title].color.push(item.color);
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      } else {
        tshirts[item.title].color = [];
        tshirts[item.title].size = [];
      }
    }
  }
  return {
    props: { tshirts: JSON.parse(JSON.stringify(tshirts)) },
  };
}
