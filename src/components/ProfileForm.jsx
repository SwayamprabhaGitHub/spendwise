import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ModalContext from "../store/modal-context";

const ProfileForm = (props) => {
  const modalCtx = useContext(ModalContext);
  const authToken = useSelector((state) => state.auth.token);
  const profileNameRef = useRef();
  const profilePhotoRef = useRef();

  const profileUpdateHandler = (event) => {
    event.preventDefault();

    const enteredProfileName = profileNameRef.current.value;
    const enteredProfilePhoto = profilePhotoRef.current.value;

    const updateHandler = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyADy5YIH48-QJJLUTErc0fgjMWRfK36tF4",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authToken,
            displayName: enteredProfileName,
            photoUrl: enteredProfilePhoto,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        props.onCancel();
      } else {
        const data = await response.json();
        console.log(data);
        throw new Error(data.error.message || "Could not Update details");
      }
    };
    updateHandler();
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyADy5YIH48-QJJLUTErc0fgjMWRfK36tF4",
        {
          method: "POST",
          body: JSON.stringify({ idToken: authToken }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.users[0].displayName) {
          profileNameRef.current.value = data.users[0].displayName;
        } else {
          profileNameRef.current.value = "";
        }
        if (data.users[0].photoUrl) {
          profilePhotoRef.current.value = data.users[0].photoUrl;
        } else {
          profilePhotoRef.current.value = "";
        }
      } else {
        const data = await response.json();
        console.log(data);
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  }, [authToken]);

  const verifyEmailHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyADy5YIH48-QJJLUTErc0fgjMWRfK36tF4",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authToken,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        modalCtx.showModal({
          title: "Verifying Email",
          message: "Please check your email!!",
        });
      } else {
        const data = await response.json();
        console.log(data);
        throw new Error(data.error.message);
      }
    } catch (error) {
      modalCtx.showModal({
        title: "Couldn't verify Email",
        message: error.message || "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
    <div className="flex justify-center items-center mb-2">
     <button
          className="bg-blue-500 dark:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 dark:hover:bg-gray-600 transition duration-200"
          type="button"
          onClick={verifyEmailHandler}
        >
          Verify Email ID
        </button>
        </div>
    <form
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-lg mx-auto"
      onSubmit={profileUpdateHandler}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Contact details</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600 transition duration-200"
          type="button"
          onClick={props.onCancel}
        >
          Cancel
        </button>
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
          htmlFor="profileName"
        >
          Full Name
        </label>
        <input
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          type="text"
          id="profileName"
          required
          ref={profileNameRef}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
          htmlFor="profilePhoto"
        >
          Profile Photo URL
        </label>
        <input
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          type="text"
          id="profilePhoto"
          required
          ref={profilePhotoRef}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-600 dark:hover:bg-blue-500 transition duration-200"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>
    </>
  );
};

export default ProfileForm;
