/**
 * patientRoutes — pages accessible only by the "patient" role.
 *
 * All entries are isPublic: false — wrapped by TabGuard.
 * Backend tab definition: roles: ["patient"]
 *
 * ─── To add a new patient page ────────────────────────────────────────────────
 *  1. Import (or create) the page component below.
 *  2. Add an entry to the array.
 *  3. Add the tab in the backend seed with roles: ["patient"].
 */

import ComingSoon from "../../components/common/ComingSoon/index.jsx";

// Placeholder factory — replace component: cs("key") with the real page when built
const cs = (tabKey) => () => <ComingSoon tabKey={tabKey} group="dashboard" />;

/** @type {import("./index.jsx").RouteConfig[]} */
export const patientRoutes = [
  {
    path: "/my-appointments",
    tabKey: "my_appointments",
    label: "My Appointments",
    tabName: "My Appointments Page",
    component: cs("my_appointments"),
    isPublic: false,
  },
  {
    path: "/my-doctors",
    tabKey: "my_doctors",
    label: "My Doctors",
    tabName: "My Doctors Page",
    component: cs("my_doctors"),
    isPublic: false,
  },
  {
    path: "/health-records",
    tabKey: "health_records",
    label: "Health Records",
    tabName: "Health Records Page",
    component: cs("health_records"),
    isPublic: false,
  },
];
