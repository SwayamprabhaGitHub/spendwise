import React from "react";
import SignUpPage from "./components/SignUpPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import WelcomePage from "./pages/WelcomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  { path: "/forgotpassword", element: <ForgotPasswordPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/welcome", element: <WelcomePage /> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
