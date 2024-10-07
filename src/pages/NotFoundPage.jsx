import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import { themeActions } from "../store/theme-slice";

const NotFoundPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutAndRedirect = () => {
    dispatch(authActions.logout());
    dispatch(themeActions.resetThemeState());
    navigate("/");
  };
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10">
          <button
            onClick={handleLogoutAndRedirect}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Log out and Go back home
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
