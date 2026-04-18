import { createSlice } from "@reduxjs/toolkit";

// ─── Hydrate from localStorage ────────────────────────────────────────────────
const loadFromStorage = () => {
  try {
    return {
      accessToken: localStorage.getItem("token") || null,
      refreshToken: localStorage.getItem("refreshToken") || null,
      user: JSON.parse(localStorage.getItem("user") || "null"),
      accessibleTabs:
        JSON.parse(localStorage.getItem("accessibleTabs") || "null") || [],
    };
  } catch {
    return {
      accessToken: null,
      refreshToken: null,
      user: null,
      accessibleTabs: [],
    };
  }
};

const stored = loadFromStorage();

// ─── Slice ────────────────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: stored.user,
    accessToken: stored.accessToken,
    refreshToken: stored.refreshToken,
    isAuthenticated: !!stored.accessToken,
    accessibleTabs: stored.accessibleTabs, // array of PermissibleTab objects from server
  },
  reducers: {
    // Called after successful OTP verification (login completion)
    setCredentials(state, { payload }) {
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.accessibleTabs = payload.accessibleTabs || [];
      state.isAuthenticated = true;

      localStorage.setItem("token", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem(
        "accessibleTabs",
        JSON.stringify(payload.accessibleTabs || []),
      );
    },

    // Called after a silent token refresh (tokens only — tabs unchanged)
    updateTokens(state, { payload }) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      localStorage.setItem("token", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
    },

    // Called when admin refreshes a user's tab permissions without full re-login
    updateAccessibleTabs(state, { payload }) {
      state.accessibleTabs = payload;
      localStorage.setItem("accessibleTabs", JSON.stringify(payload));
    },

    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.accessibleTabs = [];

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("accessibleTabs");
    },
  },
});

export const { setCredentials, updateTokens, updateAccessibleTabs, logout } =
  authSlice.actions;
export default authSlice.reducer;

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectAccessibleTabs = (state) => state.auth.accessibleTabs;
