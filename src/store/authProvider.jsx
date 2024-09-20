import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [modalMsg, setModalMsg] = useState(null);

  const isLoggedIn = !!token;

  const modalMsgHandler = (msg) => {
    if (msg !== null) {
      setModalMsg({ title: msg.title, message: msg.message });
    } else {
      setModalMsg(null);
    }
  };

  const loginHandler = (token, email) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logoutHandler = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const contextValue = {
    token: token,
    userEmail: email,
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
