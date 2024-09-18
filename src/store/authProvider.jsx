import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [token, setToken] = useState(null);
  const [modalMsg, setModalMsg] = useState(null);

  const isLoggedIn = !!token;

  const modalMsgHandler = (msg) => {
    if (msg !== null) {
      setModalMsg({ title: msg.title, message: msg.message });
    }
    else {
        setModalMsg(null);
    }
  };

  const loginHandler = (token) => {
    setToken(token);
  }

  const contextValue = {
    token: token,
    modalMsg: modalMsg,
    showModal: modalMsgHandler,
    isLoggedIn: isLoggedIn,
    loginHandler: loginHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
