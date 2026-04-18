/**
 * sharedRoutes — pages accessible by ALL authenticated roles.
 *
 * Roles: admin, doctor, patient (as defined in PermissibleTab.roles in the DB).
 * All entries here are isPublic: false — wrapped by TabGuard.
 *
 * ─── To add a new shared (all-role) page ──────────────────────────────────────
 *  1. Import (or create) the page component below.
 *  2. Add an entry to the array.
 *  3. Add the tab in the backend seed with roles: ["admin", "doctor", "patient"].
 */

import ComingSoon from "../../components/common/ComingSoon/index.jsx";

// Placeholder factory — swap out with real component when page is built
const cs = (tabKey) => () => <ComingSoon tabKey={tabKey} group="dashboard" />;

/** @type {import("./index.jsx").RouteConfig[]} */
export const sharedRoutes = [
  {
    path:      "/dashboard",
    tabKey:    "dashboard",
    label:     "Dashboard",
    tabName:   "Dashboard Page",
    component: cs("dashboard"),
    isPublic:  false,
  },
  {
    path:      "/profile",
    tabKey:    "profile",
    label:     "My Profile",
    tabName:   "Profile Page",
    component: cs("profile"),
    isPublic:  false,
  },
];
