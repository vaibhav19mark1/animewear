import { useState, useEffect } from "react";
import CartContext from "./cartContext";

const CartState = (props) => {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    // getting cart from local storage
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  }, []);

  //! Save Cart
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    if (Object.keys(cart).length == 0) {
      setSubTotal(0);
      return;
    }
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  //! Add to cart
  const addToCart = (itemCode, name, qty, size, variant, price) => {
    let newCart = cart;
    if (itemCode in newCart) {
      newCart[itemCode].qty += qty;
    } else {
      newCart[itemCode] = { qty: 1, size, variant, price, name };
    }
    saveCart(newCart);
    setCart(newCart);
  };

  //! Remove from cart
  const removeFromCart = (itemCode, qty) => {
    let newCart = cart;
    if (itemCode in newCart) {
      newCart[itemCode].qty -= qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    saveCart(newCart);
    setCart(newCart);
  };

  //! Clear Cart
  const clearCart = () => {
    setCart({});
    saveCart({});
    console.log("Cart cleared");
  };
  return <CartContext.Provider value={{ cart, subTotal, clearCart, addToCart, removeFromCart }}>{props.children}</CartContext.Provider>;
};

export default CartState;
