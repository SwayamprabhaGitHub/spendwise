import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import expenseReducer from "./expenses-slice";
import themeReducer from "./theme-slice";

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer, theme: themeReducer },
});

export default store;
