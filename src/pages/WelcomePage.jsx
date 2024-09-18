import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";

const WelcomePage = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  return (
    <>
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
          <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition duration-200"
            onClick={() => {
              setUpdateProfile(true);
            }}
          >
            Complete now!
          </button>
        </div>
      </header>
      {updateProfile && <ProfileForm />}
    </>
  );
};

export default WelcomePage;
