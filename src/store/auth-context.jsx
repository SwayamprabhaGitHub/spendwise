import React from "react";

const AuthContext = React.createContext({
  token: "",
  modalMsg: "",
  showModal: (msg) => {},
  isLoggedIn: false,
  loginHandler: (token) => {},
  logoutHandler: () => {},
});

export default AuthContext;
