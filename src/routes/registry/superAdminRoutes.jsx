/**
 * superAdminRoutes — pages exclusively for the "super_admin" role.
 *
 * The super_admin receives ALL tabs from the server on login, so the TabGuard
 * will allow access to every path automatically. This file only needs to
 * declare the route(s) so React Router knows which component to render.
 *
 * ─── To add a new super_admin-only page ───────────────────────────────────────
 *  1. Import (or create) the page component below.
 *  2. Add an entry here.
 *  3. Add the PermissibleTab in backend/scripts/seed.js with
 *     roles: ["super_admin"] and group: "super_admin".
 */

import SuperAdminPage from "../../pages/super-admin/index.jsx";

/** @type {import("./index.jsx").RouteConfig[]} */
export const superAdminRoutes = [
  {
    path:      "/super-admin",
    tabKey:    "super_admin_dashboard",
    label:     "Super Admin",
    tabName:   "Super Admin Dashboard",
    component: SuperAdminPage,
    isPublic:  false,
  },
];
