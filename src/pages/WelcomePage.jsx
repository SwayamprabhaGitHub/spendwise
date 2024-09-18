import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";

const WelcomePage = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  return (
    <header>
      {updateProfile ? (
        <p>Winners never quit. Quitters never win.</p>
      ) : (
        <p>Welcome to SpendWise!!</p>
      )}
      {updateProfile ? (
        <p>
          Your profile is 60% completed. A complete profile has higher chances
          of landing a job.
        </p>
      ) : (
        <p>Your profile is incomplete.</p>
      )}
      <button
        onClick={() => {
          setUpdateProfile(true);
        }}
      >
        Complete now!
      </button>
      {updateProfile && <ProfileForm />}
    </header>
  );
};

export default WelcomePage;
