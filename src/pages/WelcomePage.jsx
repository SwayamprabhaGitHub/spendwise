import React, { useContext, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import AuthContext from "../store/auth-context";
import Modal from "../UI/Modals";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [updateProfile, setUpdateProfile] = useState(false);

  const handleProfileForm = () => {
    setUpdateProfile(false);
  };

  const logOutUserHandler = () => {
    authCtx.logoutHandler();
    navigate('/');
  }

  const verifyEmailHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBC5LuvlgtEYmhcIe4zF0bgh8d6M60YWr4",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.token,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const data = await response.json();
        console.log(data);
        throw new Error(data.error.message);
      }
    } catch (error) {
      authCtx.showModal({
        title: "Couldn't verify Email",
        message: error.message || "Something went wrong!",
      });
    }
  };
  return (
    <>
      {authCtx.modalMsg && <Modal />}
      <header className="flex flex-col md:flex-row justify-between items-center bg-blue-500 text-white p-6 shadow-lg mb-6">
        <div className="mb-4 md:mb-0">
          {updateProfile ? (
            <p className="text-2xl font-semibold">
              Winners never quit. Quitters never win.
            </p>
          ) : (
            <p className="text-2xl font-semibold">Welcome to SpendWise!!</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          {updateProfile ? (
            <p className="text-lg md:text-right">
              Your profile is <span className="font-bold">60%</span> completed.
              A complete profile has higher chances of landing a job.
            </p>
          ) : (
            <p className="text-lg md:text-right">Your profile is incomplete.</p>
          )}
          {!updateProfile && (
            <button
              className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition duration-200"
              onClick={() => {
                setUpdateProfile(true);
              }}
            >
              Complete now!
            </button>
          )}
          <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition duration-200" onClick={logOutUserHandler}>Log Out</button>
        </div>
      </header>
      <main className="flex justify-center mt-2">
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          type="button"
          onClick={verifyEmailHandler}
        >
          Verify Email ID
        </button>
      </main>
      {updateProfile && <ProfileForm onCancel={handleProfileForm} />}
    </>
  );
};

export default WelcomePage;
