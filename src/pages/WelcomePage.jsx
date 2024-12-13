import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProfileForm from "../components/ProfileForm";
import ModalContext from "../store/modal-context";
import Modal from "../UI/Modals";
import Logo from "../assets/Spendwise_logo_no_background.png";
import DailyExpensesForm from "../components/DailyExpensesForm";
import { authActions } from "../store/auth-slice";
import { themeActions } from "../store/theme-slice";

const WelcomePage = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const modalCtx = useContext(ModalContext);

  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const authToken = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileForm = () => {
    setUpdateProfile(false);
  };

  const logOutUserHandler = () => {
    dispatch(authActions.logout());
    dispatch(themeActions.resetThemeState());
    navigate("/");
  };



  return (
    <>
      {modalCtx.modalMsg && <Modal />}
      <header className="flex flex-col md:flex-row justify-between items-center bg-blue-500 dark:bg-gray-800 text-white p-4 sm:p-6 shadow-lg mb-4 md:mb-6">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
        <img
            src={Logo}
            alt="Spendwise Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain border-4 border-black rounded-full"
          />
          <div>
            {updateProfile ? (
              <p className="text-xl sm:text-2xl font-semibold">
                Empowering smarter spending, every step of the way.
              </p>
            ) : (
              <p className="text-xl sm:text-2xl font-semibold">
                Spendwise: Track, Save, Succeed!
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4">
          {updateProfile ? (
            <p className="text-sm sm:text-base md:text-right text-gray-200">
                Set up your identity, tailor your expense tracking experience.
            </p>
          ) : (
            <p className="text-sm sm:text-base md:text-right">Your Profile, Your Financial Journey Starts Here!</p>
          )}
          {!updateProfile && (
            <button
              className="w-full md:w-auto bg-white dark:bg-gray-700 dark:text-white text-blue-500 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
              onClick={() => {
                setUpdateProfile(true);
              }}
            >
              Update now!
            </button>
          )}
          <button
            className="w-full md:w-auto bg-red-500 dark:bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition duration-200"
            onClick={logOutUserHandler}
          >
            Log Out
          </button>
        </div>
      </header>
      <main className="flex justify-center items-center p-4 sm:p-6 mt-2 mb-2">
       
      </main>
      {updateProfile && <ProfileForm onCancel={handleProfileForm} />}
      {isAuth && <DailyExpensesForm />}
    </>
  );
};

export default WelcomePage;
