import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import Modal from "../UI/Modals";
import ModalContext from "../store/modal-context";

const SignUpPage = () => {
  const modalCtx = useContext(ModalContext);

  const emailRef = useRef();
  const pswrdRef = useRef();
  const confirmPswrdRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPswrd = pswrdRef.current.value;
    const enteredConfirmPswrd = confirmPswrdRef.current.value;

    if (enteredPswrd !== enteredConfirmPswrd) {
      modalCtx.showModal({
        title: "Invalid input",
        message: "Password and confirm password does not match",
      });
      emailRef.current.value = "";
      pswrdRef.current.value = "";
      confirmPswrdRef.current.value = "";
      return;
    }
    modalCtx.showModal(null);
    const signupHandler = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADy5YIH48-QJJLUTErc0fgjMWRfK36tF4",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPswrd,
              returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(data.error.message || "Sign up failed");
        }
        modalCtx.showModal({
          title: "Sign Up Successful",
          message: "You can login now",
        });
      } catch (error) {
        modalCtx.showModal({
          title: "Sign Up Failed",
          message: error.message || "Something went wrong!",
        });
      }
    };
    signupHandler();

    emailRef.current.value = "";
    pswrdRef.current.value = "";
    confirmPswrdRef.current.value = "";
  };

  return (
    <>
      {modalCtx.modalMsg && <Modal />}
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
        <form
          className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg sm:max-w-md md:max-w-lg lg:p-10"
          onSubmit={formSubmitHandler}
        >
          <h2 className="text-xl font-bold text-center mb-4 sm:text-2xl md:mb-6">
            Sign Up to create an account
          </h2>
          <div className="relative mb-4 sm:mb-6">
            <label
              htmlFor="user-email"
              className="block text-gray-700 font-semibold text-lg mb-1 sm:text-xl"
            >
              Email
            </label>
            <input
              type="email"
              id="user-email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
              ref={emailRef}
            />
          </div>
          <div className="relative mb-4 sm:mb-6">
            <label
              htmlFor="user-pswrd"
              className="block text-gray-700 font-semibold text-lg mb-1 sm:text-xl"
            >
              Password
            </label>
            <input
              type="password"
              id="user-pswrd"
              className="peer w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
              ref={pswrdRef}
            />
          </div>
          <div className="relative mb-4 sm:mb-6">
            <label
              htmlFor="user-confirmpswrd"
              className="block text-gray-700 font-semibold text-lg mb-1 sm:text-xl"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="user-confirmpswrd"
              className="peer w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
              ref={confirmPswrdRef}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-200 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4">
          <Link className="text-sm text-blue-500 hover:underline sm:text-base" to="/">
            Have an account? Login
          </Link>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
