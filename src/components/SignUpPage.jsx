import React, { useContext, useRef, useState } from "react";
import Modal from "../UI/Modals";
import ModalContext from "../store/modal-context";
import { Link } from "react-router-dom";

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
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          modalCtx.showModal({
            title: "Sign Up Successful",
            message: "You can login now",
          });
        } else {
          const data = await response.json();
          console.log(data);
          throw new Error(data.error.message || "Sign up failed");
        }
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
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
          onSubmit={formSubmitHandler}
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Sign Up to create an account
          </h2>
          <div className="relative mb-6">
            <label
              htmlFor="user-email"
              className="block text-gray-700 font-semibold text-xl mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="user-email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
              ref={emailRef}
            />
          </div>
          <div className="relative mb-6">
            <label
              htmlFor="user-pswrd"
              className="block text-gray-700 font-semibold text-xl mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="user-pswrd"
              className="peer w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
              ref={pswrdRef}
            />
          </div>
          <div className="relative mb-6">
            <label
              htmlFor="user-confirmpswrd"
              className="block text-gray-700 font-semibold text-xl mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="user-confirmpswrd"
              className="peer w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
              ref={confirmPswrdRef}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4">
          <Link className="text-blue-500 hover:underline" to="/">
            Have an account? Login
          </Link>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
