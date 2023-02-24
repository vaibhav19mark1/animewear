import { useCartContext } from "@/context/cart/cartContext";
import Product from "@/models/Product";
import { useRouter } from "next/router";
import React, { useState } from "react";
import mongoose from "mongoose";

const Slug = ({ product, variants, error }) => {
  const { addToCart } = useCartContext();
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const [size, setSize] = useState(product.size);
  const [color, setColor] = useState(product.color);

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  const checkPin = async () => {
    if (pin.length < 6) {
      setValid(false);
      return;
    }
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setService(true);
    } else {
      setService(false);
    }
  };

  const refreshVariant = (newSize, newColor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize].slug}`;
    router.push(url);
  };

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
        <div className="container px-2 md:px-5 md:py-12 py-6 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto md:px-12 object-cover object-top md:rounded" src={product.imageUrl} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">ANIMEWEAR</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} ({product.size}/{product.color})
              </h1>
              <p className="leading-relaxed">{product.description}</p>

              {/* Color and Size */}

              <div className="flex flex-col mt-6 pb-5 border-b-2 border-gray-100 mb-5">
                {/* Colors */}
                <div className="flex items-center my-2">
                  <span className="mr-3">Colors</span>
                  {Object.keys(variants).includes("black") && (
                    <button
                      onClick={() => {
                        setColor("black");
                        // refreshVariant(size, "black");
                      }}
                      className={`border-2 ${color == "black" ? "border-gray-600" : "border-gray-300"} ml-1 bg-black rounded-full w-8 h-8 hover:border-gray-600`}
                    ></button>
                  )}
                  {Object.keys(variants).includes("blue") && (
                    <button
                      onClick={() => {
                        setColor("blue");
                        // refreshVariant(size, "blue");
                      }}
                      className={`border-2 ${color == "blue" ? "border-gray-600" : "border-gray-300"} ml-1 bg-blue-500 rounded-full w-8 h-8 hover:border-gray-600`}
                    ></button>
                  )}
                  {Object.keys(variants).includes("red") && (
                    <button
                      onClick={() => {
                        setColor("red");
                        // refreshVariant(size, "red");
                      }}
                      className={`border-2 ${color == "red" ? "border-gray-600" : "border-gray-300"} ml-1 bg-red-500 rounded-full w-8 h-8 hover:border-gray-600`}
                    ></button>
                  )}
                  {Object.keys(variants).includes("green") && (
                    <button
                      onClick={() => {
                        setColor("green");
                        // refreshVariant(size, "green");
                      }}
                      className={`border-2 ${color == "green" ? "border-gray-600" : "border-gray-300"} ml-1 bg-green-500 rounded-full w-8 h-8 hover:border-gray-600`}
                    ></button>
                  )}
                  {Object.keys(variants).includes("yellow") && (
                    <button
                      onClick={() => {
                        setColor("yellow");
                        // refreshVariant(size, "yellow");
                      }}
                      className={`border-2 ${color == "yellow" ? "border-gray-600" : "border-gray-300"} ml-1 bg-yellow-500 rounded-full w-8 h-8 hover:border-gray-600`}
                    ></button>
                  )}
                </div>

                {/* Sizes */}
                <div className="flex items-center my-2">
                  <span className="mr-3">Sizes</span>
                  <button
                    onClick={() => {
                      setSize("S");
                      refreshVariant(size, color);
                    }}
                    disabled={!Object.keys(variants[color]).includes("S")}
                    className={`border disabled:border-gray-300 disabled:text-gray-300 hover:border-red-600 rounded ${size == "S" ? "border-red-600" : "border-gray-300"} p-2 px-3 mx-1`}
                  >
                    S
                  </button>
                  <button
                    onClick={() => {
                      setSize("M");
                      refreshVariant(size, color);
                    }}
                    disabled={!Object.keys(variants[color]).includes("M")}
                    className={`border disabled:border-gray-300 disabled:text-gray-300 hover:border-red-600 rounded ${size == "M" ? "border-red-600" : "border-gray-300"} p-2 px-3 mx-1`}
                  >
                    M
                  </button>
                  <button
                    onClick={() => {
                      setSize("L");
                      refreshVariant(size, color);
                    }}
                    disabled={!Object.keys(variants[color]).includes("L")}
                    className={`border disabled:border-gray-300 disabled:text-gray-300 hover:border-red-600 rounded ${size == "L" ? "border-red-600" : "border-gray-300"} p-2 px-3 mx-1`}
                  >
                    L
                  </button>
                  <button
                    onClick={() => {
                      setSize("XL");
                      refreshVariant(size, color);
                    }}
                    disabled={!Object.keys(variants[color]).includes("XL")}
                    className={`border disabled:border-gray-300 disabled:text-gray-300 hover:border-red-600 rounded ${size == "XL" ? "border-red-600" : "border-gray-300"} p-2 px-3 mx-1`}
                  >
                    XL
                  </button>
                  <button
                    onClick={() => {
                      setSize("XXL");
                      refreshVariant(size, color);
                    }}
                    disabled={!Object.keys(variants[color]).includes("XXL")}
                    className={`border disabled:border-gray-300 disabled:text-gray-300 hover:border-red-600 rounded ${size == "XXL" ? "border-red-600" : "border-gray-300"} p-2 px-3 mx-1`}
                  >
                    XXL
                  </button>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
                <button className="flex disabled:bg-red-300 ml-4 text-white bg-red-500 border-0 py-2 px-2 md:px-6 hover:border-gray-600 hover:bg-red-600 rounded">Buy Now</button>
                <button
                  onClick={() => {
                    addToCart(slug, product.title, 1, size, color, product.price);
                  }}
                  className="flex disabled:bg-red-300 ml-4 text-white bg-red-500 border-0 py-2 px-2 md:px-6 hover:border-gray-600 hover:bg-red-600 rounded"
                >
                  Add to Cart
                </button>
              </div>
              <div className="flex mt-6 space-x-2 text-sm">
                <input type="text" minLength={6} onChange={onChangePin} className="px-2 border-2 border-gray-500 rounded-md" placeholder="Enter PIN Code" />
                <button onClick={checkPin} className="flex text-white bg-red-500 border-0 py-2 px-6 hover:border-gray-600 hover:bg-red-600 rounded">
                  Check
                </button>
              </div>
              {!service && service != null && <div className="text-red-700 text-sm mt-3">Sorry! We do not deliver to this PIN code yet</div>}
              {service && service != null && <div className="text-green-700 text-sm mt-3">Yay! This PIN code is servicable</div>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Slug;

export async function getServerSideProps(context) {
  mongoose.set("strictQuery", true);
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  if (product == null) {
    return {
      props: { error: 404 },
    };
  }
  let variants = await Product.find({ title: product.title, category: product.category });
  let colorSizeSlug = {};

  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) },
  };
}
