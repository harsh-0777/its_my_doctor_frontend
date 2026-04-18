import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectAccessibleTabs,
} from "../../store/slice/authSlice.js";

/**
 * TabGuard — protects every route that requires authentication + tab-level access.
 *
 * Security model (two layers):
 *  1. Frontend (UX):   checks isAuthenticated + accessibleTabs before rendering.
 *  2. Backend (real):  protect() + authorize() on every API call.
 *     Even if a user bypasses this guard by editing localStorage, the backend
 *     will reject any API call their role doesn't permit.
 *
 * How it works:
 *   - accessibleTabs is populated from the DB on login (via verifyOTP response).
 *   - Each tab's `path` field (e.g. "/dashboard") is the browser route AND the
 *     access identifier — the same value stored in PermissibleTab.path.
 *   - This guard checks location.pathname against those paths exactly.
 *
 * Usage in routes/index.jsx:
 *   <Route element={<TabGuard />}>
 *     <Route path="/dashboard" element={<DashboardPage />} />
 *   </Route>
 */
const TabGuard = () => {
  const location        = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accessibleTabs  = useSelector(selectAccessibleTabs) || [];

  // 1. Not logged in → send to login, preserve intended destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // 2. Logged in but this path is not in their accessible tabs
  const hasAccess = accessibleTabs.some(
    (tab) => tab.path === location.pathname && tab.isActive,
  );
  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Auth ✓  Tab access ✓
  return <Outlet />;
};

export default TabGuard;
