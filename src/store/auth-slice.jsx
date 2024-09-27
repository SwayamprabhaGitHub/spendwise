import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  isLoggedIn: !!localStorage.getItem("token"),
};
const AuthSlice = createSlice({
  name: "Authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.idToken;
      state.email = action.payload.email;
      localStorage.setItem("token", action.payload.idToken);
      localStorage.setItem("email", action.payload.email);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.email = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;
