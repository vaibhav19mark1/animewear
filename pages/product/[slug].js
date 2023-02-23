import { useCartContext } from "@/context/cart/cartContext";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Slug = () => {
  const { addToCart } = useCartContext();
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();
  //   const [valid, setValid] = useState();

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

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
        <div className="container px-2 md:px-5 md:py-12 py-6 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto md:px-12 object-cover object-top md:rounded" src="https://cdn.shopify.com/s/files/1/0070/1700/5113/products/TSM197RDMN_ecomm-2_600x.jpg?v=1673372769" />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">ANIMEWEAR</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">Title</h1>
              <p className="leading-relaxed">Description</p>

              {/* Color and Size */}
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">₹Price</span>
                <button className="flex disabled:bg-red-300 ml-4 text-white bg-red-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-red-600 rounded">Buy Now</button>
                <button
                  onClick={() => {
                    addToCart(slug, "Doraemon tshirt", 1, "L", "blue", 499);
                  }}
                  className="flex disabled:bg-red-300 ml-4 text-white bg-red-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-red-600 rounded"
                >
                  Add to Cart
                </button>
              </div>
              <div className="flex mt-6 space-x-2 text-sm">
                <input type="text" minLength={6} onChange={onChangePin} className="px-2 border-2 border-gray-400 rounded-md" placeholder="Enter PIN Code" />
                <button onClick={checkPin} className="flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
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
  let error=null;
  let product = await Product.findOne({ slug: context.query.slug });
  if (product == null) {
    return {
      props: { error: 404 },
    };
  }
  let variants = await Product.find({ title: product.title, category: product.category });
  let sizeColorSlug = {};

  for (let item of variants) {
    if (Object.keys(sizeColorSlug).includes(item.size)) {
      sizeColorSlug[item.size][item.color] = { slug: item.slug };
    } else {
      sizeColorSlug[item.size] = {};
      sizeColorSlug[item.size][item.color] = { slug: item.slug };
    }
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(sizeColorSlug)) },
  };
}
