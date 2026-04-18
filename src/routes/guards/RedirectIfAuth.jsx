import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectAccessibleTabs,
} from "../../store/slice/authSlice.js";

/**
 * RedirectIfAuth — wraps auth-only pages: /login, /signup, /verify-otp.
 *
 * If the user is already authenticated, they are bounced to their best
 * available dashboard tab instead of seeing the auth forms again.
 *
 * Redirect priority:
 *   1. /dashboard  (if it's in their accessible tabs)
 *   2. First tab in the "dashboard" group
 *   3. Home (/)  as a safe fallback
 */
const RedirectIfAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accessibleTabs  = useSelector(selectAccessibleTabs) || [];

  if (!isAuthenticated) return <Outlet />;

  const dashboardTab = accessibleTabs.find(
    (t) => t.path === "/dashboard" && t.isActive,
  );
  const firstDashTab = accessibleTabs.find(
    (t) => t.group === "dashboard" && t.isActive,
  );

  return <Navigate to={dashboardTab?.path || firstDashTab?.path || "/"} replace />;
};

export default RedirectIfAuth;
