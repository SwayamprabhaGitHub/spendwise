import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailInputRef = useRef();

  const forgotPswrdFormHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);
    const enteredEmail = emailInputRef.current.value;
    const forgotPswrdHandler = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyADy5YIH48-QJJLUTErc0fgjMWRfK36tF4",
          {
            method: "POST",
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: enteredEmail,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          console.log(response);
          const data = await response.json();
          console.log(data);
          navigate('/');
        } else {
          throw new Error("something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
      finally {
        setIsLoading(false);
      }
    };
    forgotPswrdHandler();
  };
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg sm:max-w-md md:max-w-lg lg:p-8">
        <h1 className="text-xl font-bold text-center mb-4 sm:text-2xl md:mb-6">Reset Password</h1>
        <form onSubmit={forgotPswrdFormHandler}>
          <div className="mb-4 sm:mb-6">
            <label
              htmlFor="forgotPswrdEmail"
              className="block text-gray-700 font-medium mb-2 sm:text-lg"
            >
              Enter email:
            </label>
            <input
              type="email"
              id="forgotPswrdEmail"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:p-3"
              ref={emailInputRef}
              required
            />
          </div>
          {isLoading && <p className="text-blue-500 text-center mb-4 sm:text-lg">Loading...</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition-all duration-200 sm:py-3"
          >
            Reset my Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
