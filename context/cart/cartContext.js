import { createContext, useContext } from "react";

const cartContext = createContext();

export default cartContext;

export function useCartContext() {
  return useContext(cartContext);
}
