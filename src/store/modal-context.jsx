import React from "react";

const ModalContext = React.createContext({
  modalMsg: "",
  showModal: (msg) => {},
});

export default ModalContext;
