import { createSlice } from "@reduxjs/toolkit";

const loadFromStorage = () => {
  try {
    return {
      accessToken: localStorage.getItem("token") || null,
      refreshToken: localStorage.getItem("refreshToken") || null,
      user: JSON.parse(localStorage.getItem("user") || "null"),
    };
  } catch {
    return { accessToken: null, refreshToken: null, user: null };
  }
};

const stored = loadFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: stored.user,
    accessToken: stored.accessToken,
    refreshToken: stored.refreshToken,
    isAuthenticated: !!stored.accessToken,
  },
  reducers: {
    setCredentials(state, { payload }) {
      state.user          = payload.user;
      state.accessToken   = payload.accessToken;
      state.refreshToken  = payload.refreshToken;
      state.isAuthenticated = true;
      localStorage.setItem("token", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(payload.user));
    },

    updateTokens(state, { payload }) {
      state.accessToken  = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      localStorage.setItem("token", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
    },

    logout(state) {
      state.user            = null;
      state.accessToken     = null;
      state.refreshToken    = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, updateTokens, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser    = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAccessToken    = (state) => state.auth.accessToken;
