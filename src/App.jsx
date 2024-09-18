import React from "react";
import SignUpPage from "./components/SignUpPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./components/SignInPage";

const router = createBrowserRouter([
  { path: "/", element: <SignInPage /> },
  { path: "/signup", element: <SignUpPage /> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
