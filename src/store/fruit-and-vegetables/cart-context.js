import React from "react";

const CartContext = React.createContext({
  cart: undefined, 
  setCart: undefined,
});

export default CartContext;