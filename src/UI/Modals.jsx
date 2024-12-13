import React, { useContext } from "react";
import ReactDOM from "react-dom";
import ModalContext from "../store/modal-context";

const Overlay = () => {
  const modalCtx = useContext(ModalContext);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => {
        modalCtx.showModal(null);
      }}
    >
      <section className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative z-10 transition-transform transform scale-95 sm:scale-100 sm:p-8 md:max-w-lg lg:max-w-xl" 
      onClick={(e) => e.stopPropagation()} // Prevent modal close on inner clicks 
      >
        <header className="mb-4">
          <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl">
            {modalCtx.modalMsg.title}
          </h1>
        </header>
        <div className="mb-6">
          <p className="text-gray-600 sm:text-lg">{modalCtx.modalMsg.message}</p>
        </div>
        <footer className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              modalCtx.showModal(null);
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:py-3 sm:px-5"
          >
            Okay
          </button>
        </footer>
      </section>
    </div>
  );
};

const Modal = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Overlay />,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
};

export default Modal;
