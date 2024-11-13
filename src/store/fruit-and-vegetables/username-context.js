import React from "react";

const UsernameContext = React.createContext({
  username: undefined, 
  setUsername: undefined,
});

export default UsernameContext;