import React from "react";

const OrdersContext = React.createContext({
  orders: undefined, 
  setOrders: undefined,
  fetchOrders: undefined,
});

export default OrdersContext;