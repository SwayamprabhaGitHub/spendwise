import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const ProfileForm = (props) => {
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <form
      className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto"
      onSubmit={profileUpdateHandler}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contact details</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
          type="button"
          onClick={props.onCancel}
        >
          Cancel
        </button>
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="profileName"
        >
          Full Name
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="profileName"
          required
          ref={profileNameRef}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="profilePhoto"
        >
          Profile Photo URL
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="profilePhoto"
          required
          ref={profilePhotoRef}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
