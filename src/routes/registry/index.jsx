/**
 * routes/registry/index.jsx — combines all route arrays into a single registry.
 *
 * ─── Shape of each route entry (RouteConfig) ──────────────────────────────────
 * {
 *   path:           string   — browser URL AND the PermissibleTab.path identifier
 *   tabKey:         string   — matches PermissibleTab.key  (e.g. "my_appointments")
 *   label:          string   — short display name           (e.g. "My Appointments")
 *   tabName:        string   — full descriptive page name   (e.g. "My Appointments Page")
 *   component:      React FC — the page component to render
 *   isPublic:       boolean  — true → no auth needed
 *   redirectIfAuth: boolean? — true → redirect logged-in users away (auth pages)
 * }
 *
 * ─── Adding a new page ─────────────────────────────────────────────────────────
 *  • Public page      → edit publicRoutes.jsx
 *  • Auth page        → edit authRoutes.jsx
 *  • All-roles page   → edit sharedRoutes.jsx
 *  • Patient page     → edit patientRoutes.jsx
 *  • Doctor page      → edit doctorRoutes.jsx
 *  • Admin page       → edit adminRoutes.jsx
 *  • Then also add the PermissibleTab entry in backend/scripts/seed.js
 *
 * @typedef {{ path: string, tabKey: string, label: string, tabName: string,
 *             component: import("react").FC, isPublic: boolean,
 *             redirectIfAuth?: boolean }} RouteConfig
 */

import { authRoutes }       from "./authRoutes.jsx";
import { publicRoutes }     from "./publicRoutes.jsx";
import { sharedRoutes }     from "./sharedRoutes.jsx";
import { patientRoutes }    from "./patientRoutes.jsx";
import { doctorRoutes }     from "./doctorRoutes.jsx";
import { adminRoutes }      from "./adminRoutes.jsx";
import { superAdminRoutes } from "./superAdminRoutes.jsx";

// Order matters for route matching — more specific paths should come before wildcards
const routeRegistry = [
  ...authRoutes,
  ...publicRoutes,
  ...sharedRoutes,
  ...patientRoutes,
  ...doctorRoutes,
  ...adminRoutes,
  ...superAdminRoutes,
];

// ─── Derived lookups (O(1) access by path or tabKey) ─────────────────────────
export const routeByPath   = Object.fromEntries(routeRegistry.map((r) => [r.path,   r]));
export const routeByTabKey = Object.fromEntries(routeRegistry.map((r) => [r.tabKey, r]));

export default routeRegistry;
