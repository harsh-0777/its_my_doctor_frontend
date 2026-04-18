/**
 * routes/index.jsx — AppRoutes
 *
 * Renders all application routes from the central registry.
 * This is the ONLY file that should contain <Routes> and <Route> elements.
 *
 * ─── Route buckets ────────────────────────────────────────────────────────────
 *  1. redirectIfAuth  → RedirectIfAuth guard  (login, signup, verify-otp)
 *                        Logged-in users are bounced to their dashboard.
 *
 *  2. isPublic        → No guard              (home, about, blog, contact…)
 *                        Always accessible to everyone.
 *
 *  3. protected       → TabGuard              (/dashboard, /admin/*, /doctor/*)
 *                        Requires authentication AND the path must exist in
 *                        the user's accessibleTabs (fetched from DB on login).
 *
 * ─── System routes (outside the registry) ────────────────────────────────────
 *  /unauthorized → 403 page (rendered by TabGuard on access denial)
 *  /privacy-policy, /terms-of-use → aliases for /legal (same component)
 *  * → 404 catch-all
 *
 * ─── To change routing behaviour ─────────────────────────────────────────────
 *  • Guard logic    → edit routes/guards/TabGuard.jsx or RedirectIfAuth.jsx
 *  • Route entries  → edit routes/registry/<roleFile>.jsx
 *  • Route rendering → edit this file
 */

import { Routes, Route } from "react-router-dom";
import routeRegistry from "./registry/index.jsx";
import { TabGuard, RedirectIfAuth } from "./guards/index.js";

// System pages — not in registry (no PermissibleTab needed)
import LegalPage from "../pages/legal/index.jsx";
import UnauthorizedPage from "../pages/unauthorized/index.jsx";
import NotFoundPage from "../pages/not-found/index.jsx";

// ─── Derived route sets ───────────────────────────────────────────────────────
const authRoutes = routeRegistry.filter((r) => r.redirectIfAuth);
const publicRoutes = routeRegistry.filter(
  (r) => r.isPublic && !r.redirectIfAuth,
);
const protectedRoutes = routeRegistry.filter((r) => !r.isPublic);

// ─────────────────────────────────────────────────────────────────────────────
const AppRoutes = () => (
  <Routes>
    {/* ── Auth pages — bounce to dashboard if already logged in ─────────── */}
    <Route element={<RedirectIfAuth />}>
      {authRoutes.map(({ path, component: Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Route>

    {/* ── Public pages — always accessible, no guard ────────────────────── */}
    {publicRoutes.map(({ path, component: Page }) => (
      <Route key={path} path={path} element={<Page />} />
    ))}

    {/* ── Legal URL aliases — same LegalPage, different URL ─────────────── */}
    <Route path="/privacy-policy" element={<LegalPage />} />
    <Route path="/terms-of-use" element={<LegalPage />} />

    {/* ── Protected pages — auth + tab access required ──────────────────── */}
    <Route element={<TabGuard />}>
      {protectedRoutes.map(({ path, component: Page, tabKey }) => (
        <Route key={path} path={path} element={<Page tabKey={tabKey} />} />
      ))}
    </Route>

    {/* ── System / utility routes ───────────────────────────────────────── */}
    <Route path="/unauthorized" element={<UnauthorizedPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
