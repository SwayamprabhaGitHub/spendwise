import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [modalMsg, setModalMsg] = useState(null);

  const modalMsgHandler = (msg) => {
    if (msg !== null) {
      setModalMsg({ title: msg.title, message: msg.message });
    } else {
      setModalMsg(null);
    }
  };

  const contextValue = {
    modalMsg: modalMsg,
    showModal: modalMsgHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
