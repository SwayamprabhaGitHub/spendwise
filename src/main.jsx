import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.jsx";
import AuthProvider from "./store/authProvider.jsx";

createRoot(document.getElementById("root")).render(<Provider store={store}><AuthProvider><App /></AuthProvider></Provider>);
