/**
 * adminRoutes — pages accessible only by the "admin" role.
 *
 * All entries are isPublic: false — wrapped by TabGuard.
 * Backend tab definition: roles: ["admin"]
 *
 * ─── To add a new admin page ──────────────────────────────────────────────────
 *  1. Import (or create) the page component below.
 *  2. Add an entry to the array.
 *  3. Add the tab in the backend seed with roles: ["admin"].
 */

import ComingSoon from "../../components/common/ComingSoon/index.jsx";

// Placeholder factory — replace component: cs("key") with the real page when built
const cs = (tabKey) => () => <ComingSoon tabKey={tabKey} group="admin" />;

/** @type {import("./index.jsx").RouteConfig[]} */
export const adminRoutes = [
  {
    path:      "/admin/users",
    tabKey:    "admin_users",
    label:     "Manage Users",
    tabName:   "User Management Page",
    component: cs("admin_users"),
    isPublic:  false,
  },
  {
    path:      "/admin/doctors",
    tabKey:    "admin_doctors",
    label:     "Manage Doctors",
    tabName:   "Doctor Management Page",
    component: cs("admin_doctors"),
    isPublic:  false,
  },
  {
    path:      "/admin/appointments",
    tabKey:    "admin_appointments",
    label:     "All Appointments",
    tabName:   "Appointments Admin Page",
    component: cs("admin_appointments"),
    isPublic:  false,
  },
  {
    path:      "/admin/contacts",
    tabKey:    "admin_contacts",
    label:     "Contact Messages",
    tabName:   "Contact Messages Page",
    component: cs("admin_contacts"),
    isPublic:  false,
  },
  {
    path:      "/admin/tabs",
    tabKey:    "admin_tabs",
    label:     "Manage Tabs",
    tabName:   "Tab Management Page",
    component: cs("admin_tabs"),
    isPublic:  false,
  },
];
