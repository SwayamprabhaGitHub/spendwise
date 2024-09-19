import React, { useRef, useState } from "react";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();

  const forgotPswrdFormHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);
    const enteredEmail = emailInputRef.current.value;
    const forgotPswrdHandler = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBC5LuvlgtEYmhcIe4zF0bgh8d6M60YWr4",
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
    <form onSubmit={forgotPswrdFormHandler}>
      <h1>Reset Password Form</h1>
      <div>
        <label htmlFor="forgotPswrdEmail">Enter emailID:</label>
        <input
          type="email"
          id="forgotPswrdEmail"
          ref={emailInputRef}
          required
        />
      </div>
      {isLoading && <p>Loading...</p>}
      <button>Reset my Password</button>
    </form>
  );
};

export default ForgotPasswordPage;
