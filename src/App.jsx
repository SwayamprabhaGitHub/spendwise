import React from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import SignInPage from "./components/SignInPage";
import WelcomePage from "./pages/WelcomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SignUpPage from "./components/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useSelector } from "react-redux";

const createRouter = (loginStatus) => createBrowserRouter([
  {
    path: "/",
    element: !loginStatus ? <SignInPage /> : <Navigate to="/welcome" />,
  },
  { path: "/forgotpassword", element: <ForgotPasswordPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/welcome", element: loginStatus ? <WelcomePage /> : <Navigate to="/" /> },
  { path: "*", element: <NotFoundPage /> },
]);

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const router = createRouter(isLoggedIn);
  
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
