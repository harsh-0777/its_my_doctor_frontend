/**
 * doctorRoutes — pages accessible only by the "doctor" role.
 *
 * All entries are isPublic: false — wrapped by TabGuard.
 * Backend tab definition: roles: ["doctor"]
 *
 * ─── To add a new doctor page ─────────────────────────────────────────────────
 *  1. Import (or create) the page component below.
 *  2. Add an entry to the array.
 *  3. Add the tab in the backend seed with roles: ["doctor"].
 */

import ComingSoon from "../../components/common/ComingSoon/index.jsx";

// Placeholder factory — replace component: cs("key") with the real page when built
const cs = (tabKey) => () => <ComingSoon tabKey={tabKey} group="dashboard" />;

/** @type {import("./index.jsx").RouteConfig[]} */
export const doctorRoutes = [
  {
    path:      "/doctor/schedule",
    tabKey:    "doctor_schedule",
    label:     "My Schedule",
    tabName:   "Doctor Schedule Page",
    component: cs("doctor_schedule"),
    isPublic:  false,
  },
  {
    path:      "/doctor/patients",
    tabKey:    "doctor_patients",
    label:     "My Patients",
    tabName:   "Doctor Patients Page",
    component: cs("doctor_patients"),
    isPublic:  false,
  },
  {
    path:      "/doctor/appointments",
    tabKey:    "doctor_appointments",
    label:     "Appointments",
    tabName:   "Doctor Appointments Page",
    component: cs("doctor_appointments"),
    isPublic:  false,
  },
];
