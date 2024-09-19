import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [modalMsg, setModalMsg] = useState(null);

  const isLoggedIn = !!token;

  const modalMsgHandler = (msg) => {
    if (msg !== null) {
      setModalMsg({ title: msg.title, message: msg.message });
    } else {
      setModalMsg(null);
    }
  };

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const contextValue = {
    token: token,
    modalMsg: modalMsg,
    showModal: modalMsgHandler,
    isLoggedIn: isLoggedIn,
    loginHandler: loginHandler,
    logoutHandler: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
