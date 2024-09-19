import React, { useContext, useRef } from "react";
import Modal from "../UI/Modals";
import AuthContext from "../store/auth-context";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const emailSignInRef = useRef();
  const pswrdSignInRef = useRef();

  const SigninFormSubmitHandler = (event) => {
    event.preventDefault();

    const enteredSignInMail = emailSignInRef.current.value;
    const enteredSignInPswrd = pswrdSignInRef.current.value;

    const signInHandler = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBC5LuvlgtEYmhcIe4zF0bgh8d6M60YWr4",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredSignInMail,
              password: enteredSignInPswrd,
              returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          authCtx.loginHandler(data.idToken);
          navigate("/welcome");
        } else {
          const data = await response.json();
          console.log(data);
          throw new Error(data.error.message || "Could not Log In. Try again!");
        }
      } catch (error) {
        authCtx.showModal({
          title: "Sign In Failed",
          message: error.message || "Something went wrong!",
        });
      }
    };
    signInHandler();
  };

  return (
    <>
      {authCtx.modalMsg && <Modal />}
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
          onSubmit={SigninFormSubmitHandler}
        >
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
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
              ref={emailSignInRef}
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
              ref={pswrdSignInRef}
            />
          </div>
          <div className="flex justify-center mb-2">
            <Link
              className="text-red-500 hover:underline"
              to="/forgotpassword"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <Link className="text-blue-500 hover:underline" to="/signup">
            Don't have an account? Sign Up
          </Link>
        </div>
      </section>
    </>
  );
};

export default SignInPage;
