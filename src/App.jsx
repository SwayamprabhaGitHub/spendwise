import React from "react";
import SignUpPage from "./components/SignUpPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import WelcomePage from "./pages/WelcomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/welcome", element: <WelcomePage /> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
