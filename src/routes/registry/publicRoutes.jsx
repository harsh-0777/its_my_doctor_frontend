/**
 * publicRoutes — home, header nav, and all company pages.
 *
 * All entries here are isPublic: true (accessible without authentication).
 * They are NOT wrapped by TabGuard.
 *
 * Groups covered:
 *   utility  — home page
 *   main_nav — Find Doctor, Video Consultation, Lab Tests (shown in header nav)
 *   company  — About, Careers, Press, Blog, Contact, Legal (shown in footer)
 *
 * ─── To add a new public page ─────────────────────────────────────────────────
 *  1. Import (or create) the page component below.
 *  2. Add an entry to the correct group section in the array.
 *  3. Add the corresponding tab in the backend seed + PermissibleTab DB.
 *  4. If it should appear in the header nav, set group: "main_nav" in the DB.
 */

import HomePage    from "../../pages/home/index.jsx";
import AboutPage   from "../../pages/about/index.jsx";
import CareersPage from "../../pages/careers/index.jsx";
import PressPage   from "../../pages/press/index.jsx";
import BlogPage    from "../../pages/blog/index.jsx";
import ContactPage from "../../pages/contact/index.jsx";
import LegalPage   from "../../pages/legal/index.jsx";
import ComingSoon  from "../../components/common/ComingSoon/index.jsx";

// Placeholder factory for unbuilt public pages
const cs = (tabKey) => () => <ComingSoon tabKey={tabKey} group="main_nav" />;

/** @type {import("./index.jsx").RouteConfig[]} */
export const publicRoutes = [
  // ── Utility ────────────────────────────────────────────────────────────────
  {
    path:      "/",
    tabKey:    "home",
    label:     "Home",
    tabName:   "Home Page",
    component: HomePage,
    isPublic:  true,
  },

  // ── Main Nav (header) ───────────────────────────────────────────────────────
  {
    path:      "/find-doctor",
    tabKey:    "find_doctor",
    label:     "Find Doctor",
    tabName:   "Find Doctor Page",
    component: cs("find_doctor"),
    isPublic:  true,
  },
  {
    path:      "/video-consultant",
    tabKey:    "video_consult",
    label:     "Video Consultation",
    tabName:   "Video Consultation Page",
    component: cs("video_consult"),
    isPublic:  true,
  },
  {
    path:      "/lab-tests",
    tabKey:    "lab_tests",
    label:     "Lab Tests",
    tabName:   "Lab Tests Page",
    component: cs("lab_tests"),
    isPublic:  true,
  },

  // ── Company (footer) ────────────────────────────────────────────────────────
  { path: "/about",   tabKey: "about",   label: "About Us",   tabName: "About Us Page",        component: AboutPage,   isPublic: true },
  { path: "/careers", tabKey: "careers", label: "Careers",    tabName: "Careers Page",         component: CareersPage, isPublic: true },
  { path: "/press",   tabKey: "press",   label: "Press",      tabName: "Press & Media Page",   component: PressPage,   isPublic: true },
  { path: "/blog",    tabKey: "blog",    label: "Blog",       tabName: "Blog Page",            component: BlogPage,    isPublic: true },
  { path: "/contact", tabKey: "contact", label: "Contact Us", tabName: "Contact Us Page",      component: ContactPage, isPublic: true },
  { path: "/legal",   tabKey: "legal",   label: "Legal",      tabName: "Legal & Privacy Page", component: LegalPage,   isPublic: true },
];
