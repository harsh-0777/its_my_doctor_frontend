import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

// ─── Nav links config ─────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Find Doctor",      to: "/find-doctor" },
  { label: "Video Consultant", to: "/video-consultant" },
  { label: "Lab Tests",        to: "/lab-tests" },
];

// ─── Inline SVG icons ─────────────────────────────────────────────────────────
const StethoscopeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
    <circle cx="18" cy="17" r="2.5" stroke="#059669" strokeWidth="1.8" />
    <path
      d="M6 3C4.343 3 3 4.343 3 6v4a6 6 0 006 6h1a5 5 0 005-5V8"
      stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round"
    />
    <path
      d="M15.5 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      stroke="#059669" strokeWidth="1.8"
    />
    <path d="M15.5 8v3.5" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const MenuIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ─── Desktop NavLink ──────────────────────────────────────────────────────────
const DesktopNavLink = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        "relative text-sm font-medium transition-colors duration-200 py-1",
        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:rounded-full",
        "after:transition-all after:duration-300",
        isActive
          ? "text-emerald-600 after:w-full after:bg-emerald-600"
          : "text-gray-600 hover:text-emerald-600 after:w-0 hover:after:w-full after:bg-emerald-600",
      ].join(" ")
    }
  >
    {label}
  </NavLink>
);

// ─── Mobile NavLink ───────────────────────────────────────────────────────────
const MobileNavLink = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      [
        "block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150",
        isActive
          ? "bg-emerald-50 text-emerald-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-emerald-600",
      ].join(" ")
    }
  >
    {label}
  </NavLink>
);

// ─── Header ───────────────────────────────────────────────────────────────────
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef                 = useRef(null);
  const location                = useLocation();

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname]);

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      ref={menuRef}
      className={[
        "sticky top-0 z-50 w-full",
        "bg-[#fdfaf5] border-b border-gray-200/80",
        "transition-shadow duration-300",
        scrolled ? "shadow-sm shadow-gray-200" : "",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* ── Logo ──────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            aria-label="Its my Doc — Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg
                            bg-gradient-to-br from-emerald-100 to-blue-100
                            border border-emerald-200 group-hover:border-emerald-400
                            transition-colors duration-200">
              <StethoscopeIcon />
            </div>
            <span className="text-lg font-semibold tracking-tight select-none">
              <span className="text-gray-800">Its my </span>
              <span className="text-emerald-600">Doc</span>
            </span>
          </Link>

          {/* ── Desktop nav ───────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <DesktopNavLink key={link.to} {...link} />
            ))}
          </nav>

          {/* ── Desktop auth buttons ──────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg border border-emerald-500 px-4 py-1.5
                         text-sm font-medium text-emerald-600
                         hover:bg-emerald-50 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-lg bg-blue-600 px-4 py-1.5
                         text-sm font-medium text-white
                         hover:bg-blue-500 active:bg-blue-700
                         transition-colors duration-200 shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* ── Mobile hamburger ──────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden rounded-lg p-2 text-gray-500
                       hover:bg-gray-100 hover:text-emerald-600
                       transition-colors duration-150"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={[
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="mx-4 h-px bg-gray-200" />

        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <MobileNavLink
              key={link.to}
              {...link}
              onClick={() => setMenuOpen(false)}
            />
          ))}

          <div className="my-2 h-px bg-gray-200" />

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg border border-emerald-500 px-4 py-2.5 text-center
                       text-sm font-medium text-emerald-600
                       hover:bg-emerald-50 transition-colors duration-150"
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg bg-blue-600 px-4 py-2.5 text-center
                       text-sm font-medium text-white
                       hover:bg-blue-500 transition-colors duration-150 mt-1"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
