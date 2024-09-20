import React from "react";

const AuthContext = React.createContext({
  token: "",
  userEmail: "",
  modalMsg: "",
  showModal: (msg) => {},
  isLoggedIn: false,
  loginHandler: (token, email) => {},
  logoutHandler: () => {},
});

export default AuthContext;
