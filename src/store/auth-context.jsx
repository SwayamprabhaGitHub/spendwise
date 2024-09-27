import React from "react";

const AuthContext = React.createContext({
  modalMsg: "",
  showModal: (msg) => {},
});

export default AuthContext;
