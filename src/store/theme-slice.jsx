import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = { isPremium: false, isDarkMode: false };
const ThemeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    togglePremium(state) {
      state.isPremium = !state.isPremium;
      // Disable dark mode if premium is deactivated
      if (!state.isPremium && state.isDarkMode) {
        state.isDarkMode = false;
        document.documentElement.classList.remove("dark");
      }
    },

    toggleTheme(state) {
      // Only allow toggling dark mode if user is a premium member
      if (state.isPremium) {
        state.isDarkMode = !state.isDarkMode;
        document.documentElement.classList.toggle("dark");
      }
    },
    resetThemeState(state) {
      // Reset theme to initial values
      state.isPremium = false;
      state.isDarkMode = false;
      document.documentElement.classList.remove("dark");
    },
  },
});

export const themeActions = ThemeSlice.actions;
export default ThemeSlice.reducer;
