import React from "react";

const ProductsContext = React.createContext({
  products: undefined, 
  setProducts: undefined,
  fetchProducts: undefined
});

export default ProductsContext;