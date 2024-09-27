import React, { useState } from "react";
import ModalContext from "./modal-context";

const ModalProvider = (props) => {
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
    <ModalContext.Provider value={contextValue}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
