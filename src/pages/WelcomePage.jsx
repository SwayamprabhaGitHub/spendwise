import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProfileForm from "../components/ProfileForm";
import ModalContext from "../store/modal-context";
import Modal from "../UI/Modals";
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
      <header className="flex flex-col md:flex-row justify-between items-center bg-blue-500 dark:bg-gray-800 text-white p-6 shadow-lg mb-6">
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
              className="bg-white dark:bg-gray-700 dark:text-white text-blue-500 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
              onClick={() => {
                setUpdateProfile(true);
              }}
            >
              Complete now!
            </button>
          )}
          <button
            className="bg-red-500 dark:bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition duration-200"
            onClick={logOutUserHandler}
          >
            Log Out
          </button>
        </div>
      </header>
      <main className="flex justify-center mt-2 mb-2">
       
      </main>
      {updateProfile && <ProfileForm onCancel={handleProfileForm} />}
      {isAuth && <DailyExpensesForm />}
    </>
  );
};

export default WelcomePage;
