import React, { useContext, useRef } from "react";
import AuthContext from "../store/auth-context";

const ProfileForm = (props) => {
  const authCtx = useContext(AuthContext);

  const profileNameRef = useRef();
  const profilePhotoRef = useRef();

  const profileUpdateHandler = (event) => {
    event.preventDefault();

    const enteredProfileName = profileNameRef.current.value;
    const enteredProfilePhoto = profilePhotoRef.current.value;

    const updateHandler = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBC5LuvlgtEYmhcIe4zF0bgh8d6M60YWr4",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            displayName: enteredProfileName,
            photoUrl: enteredProfilePhoto,
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
        throw new Error(data.error.message || "Could not Update details");
      }
    };
    updateHandler();
  };
  return (
    <form onSubmit={profileUpdateHandler}>
      <div>
        <h1>Contact details</h1>
        <button>Cancel</button>
      </div>

      <div>
        <label htmlFor="profileName">Full Name</label>
        <input type="text" id="profileName" required ref={profileNameRef} />
      </div>
      <div>
        <label htmlFor="profilePhoto">Profile Photo URL</label>
        <input type="text" id="profilePhoto" required ref={profilePhotoRef} />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default ProfileForm;
