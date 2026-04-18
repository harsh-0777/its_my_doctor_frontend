/**
 * authRoutes — login, signup, verify-otp.
 *
 * These are PUBLIC pages that should redirect AWAY if the user is already
 * logged in (handled by RedirectIfAuth guard in routes/index.jsx).
 *
 * ─── To add a new auth page ───────────────────────────────────────────────────
 *  1. Import the page component below.
 *  2. Add an entry to the array with redirectIfAuth: true.
 *  3. Add the corresponding tab in the backend seed + PermissibleTab DB.
 */

import LoginPage     from "../../pages/auth/login/index.jsx";
import SignupPage    from "../../pages/auth/signup/index.jsx";
import VerifyOTPPage from "../../pages/auth/verify-otp/index.jsx";

/** @type {import("./index.jsx").RouteConfig[]} */
export const authRoutes = [
  {
    path:           "/login",
    tabKey:         "login",
    label:          "Login",
    tabName:        "Login Page",
    component:      LoginPage,
    isPublic:       true,
    redirectIfAuth: true,
  },
  {
    path:           "/signup",
    tabKey:         "signup",
    label:          "Sign Up",
    tabName:        "Sign Up Page",
    component:      SignupPage,
    isPublic:       true,
    redirectIfAuth: true,
  },
  {
    path:           "/verify-otp",
    tabKey:         "verify_otp",
    label:          "Verify OTP",
    tabName:        "OTP Verification Page",
    component:      VerifyOTPPage,
    isPublic:       true,
    redirectIfAuth: true,
  },
];
