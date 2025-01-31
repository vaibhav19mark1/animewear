import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CartContext from "./cartContext";

const CartState = ({ children }) => {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [openCart, setOpenCart] = useState(false);
  const [user, setUser] = useState({ value: null });
  const [subTotal, setSubTotal] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
      const storedUser = JSON.parse(localStorage.getItem("myuser")) || {
        value: null,
      };

      setCart(storedCart);
      setUser(storedUser);
    } catch (error) {
      console.error("Error loading data from local storage", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      let total = Object.values(cart).reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      setSubTotal(total);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isClient]);

  //! Open and close cart
  const showCart = (show) => setOpenCart(show);

  //! Add to cart (Fixed)
  const addToCart = (itemCode, name, qty, size, variant, price) => {
    setCart((prevCart) => {
      return {
        ...prevCart,
        [itemCode]: {
          ...prevCart[itemCode],
          qty: (prevCart[itemCode]?.qty || 0) + qty,
          size,
          variant,
          price,
          name,
        },
      };
    });
    !openCart && showCart(true);
  };

  //! Remove from cart (Fixed)
  const removeFromCart = (itemCode, qty) => {
    setCart((prevCart) => {
      if (!prevCart[itemCode]) return prevCart;

      const newQty = prevCart[itemCode].qty - qty;
      const newCart = { ...prevCart };

      if (newQty <= 0) {
        delete newCart[itemCode]; // Remove item if quantity is 0
      } else {
        newCart[itemCode] = { ...prevCart[itemCode], qty: newQty };
      }
      return newCart;
    });
  };

  //! Clear Cart
  const clearCart = () => setCart({});

  //! Buy Now
  const buyNow = (itemCode, price, name, size, variant) => {
    setCart({ [itemCode]: { qty: 1, price, name, size, variant } });
    router.push("/checkout");
  };

  //! Logout
  const logout = () => {
    localStorage.removeItem("myuser");
    setUser({ value: null });
    router.push("/");
  };

  return (
    <CartContext.Provider
      value={{
        user,
        cart,
        subTotal,
        openCart,
        logout,
        setUser,
        buyNow,
        clearCart,
        addToCart,
        removeFromCart,
        showCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
