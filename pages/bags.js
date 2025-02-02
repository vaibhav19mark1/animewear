import Product from "@/models/Product";
import mongoose from "mongoose";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Bags = ({ bags }) => {
  return (
    <>
      <Head>
        <title>Bags - AnimeWear</title>
        <meta name="description" content="Best anime bags" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <div className="min-h-screen">
        {bags.length !== 0 && (
          <h1 className="text-center m-3 text-2xl md:m-5 md:text-4xl font-semibold">
            Bags
          </h1>
        )}
        <section>
          <div className="flex flex-wrap justify-center">
            {bags.length === 0 && (
              <p className="my-10">
                Sorry! All the bags are currently out of stock. New stock coming
                soon. Stay tuned!
              </p>
            )}
            {bags.map((item) => {
              return (
                <div
                  key={item._id}
                  className="lg:w-1/5 md:w-1/3 w-1/2 border border-gray-300 md:border-none md:shadow-lg m-0 md:m-5 md:transition md:ease-in-out md:hover:-translate-y-1 md:hover:scale-110 md:duration-300"
                >
                  <Link
                    href={`/product/${item.slug}`}
                    className="block relative h-auto md:h-72 overflow-hidden"
                  >
                    <img
                      src={item.imageUrl}
                      alt="bag-image"
                      className="object-top block"
                    />
                  </Link>
                  <div className="mt-4 pl-4 pb-4">
                    <h2 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      Bag
                    </h2>
                    <h3 className="text-gray-900 title-font text-lg font-medium">
                      {item.title}{" "}
                    </h3>
                    <div>₹{item.price} </div>
                    <div className="mt-1">
                      {item.size.includes("S") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          S
                        </span>
                      )}
                      {item.size.includes("M") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          M
                        </span>
                      )}
                      {item.size.includes("L") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          L
                        </span>
                      )}
                      {item.size.includes("XL") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          XL
                        </span>
                      )}
                      {item.size.includes("XXL") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          XXL
                        </span>
                      )}
                      {item.size.includes("one-size") && (
                        <span className="border border-gray-300 px-1 mx-1">
                          One Size
                        </span>
                      )}
                    </div>
                    <div className="mt-1">
                      {item.color.includes("red") && (
                        <button className="border-2 border-gray-300 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {item.color.includes("yellow") && (
                        <button className="border-2 border-gray-300 ml-1 bg-yellow-600 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {item.color.includes("green") && (
                        <button className="border-2 border-gray-300 ml-1 bg-green-600 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {item.color.includes("black") && (
                        <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {item.color.includes("blue") && (
                        <button className="border-2 border-gray-300 ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {item.color.includes("pink") && (
                        <button className="border-2 border-gray-300 ml-1 bg-pink-600 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {item.color.includes("orange") && (
                        <button className="border-2 border-gray-300 ml-1 bg-orange-600 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
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

export default Bags;

export async function getServerSideProps() {
  mongoose.set("strictQuery", true);
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const bags = await Product.find({ category: "bag" });

  return {
    props: { bags: JSON.parse(JSON.stringify(bags)) },
  };
}
