import { Link } from "react-router-dom";

// ─── Footer link data ─────────────────────────────────────────────────────────
const QUICK_LINKS = [
  { label: "Find a Doctor",       to: "/find-doctor"      },
  { label: "Video Consultation",  to: "/video-consultant" },
  { label: "Lab Tests",           to: "/lab-tests"        },
  { label: "Book Appointment",    to: "/find-doctor"      },
  { label: "Emergency Care",      to: "/find-doctor"      },
  { label: "Health Packages",     to: "/lab-tests"        },
];

const SPECIALTIES = [
  { label: "Cardiology",    to: "/find-doctor" },
  { label: "Neurology",     to: "/find-doctor" },
  { label: "Orthopedics",   to: "/find-doctor" },
  { label: "Dermatology",   to: "/find-doctor" },
  { label: "Pediatrics",    to: "/find-doctor" },
  { label: "Gynecology",    to: "/find-doctor" },
  { label: "Ophthalmology", to: "/find-doctor" },
  { label: "Dentistry",     to: "/find-doctor" },
];

const COMPANY_LINKS = [
  { label: "About Us",       to: "/about"                    },
  { label: "Careers",        to: "/careers"                  },
  { label: "Press",          to: "/press"                    },
  { label: "Blog",           to: "/blog"                     },
  { label: "Contact Us",     to: "/contact"                  },
  { label: "Privacy Policy", to: "/legal?tab=privacy"        },
  { label: "Terms of Use",   to: "/legal?tab=terms"          },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",    to: "/legal?tab=privacy" },
  { label: "Terms of Service",  to: "/legal?tab=terms"   },
  { label: "Cookie Policy",     to: "/legal?tab=privacy" },
  { label: "Disclaimer",        to: "/legal?tab=terms"   },
];

// ─── SVG social icons ─────────────────────────────────────────────────────────
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);

// ─── Inline stethoscope logo icon (same as header) ───────────────────────────
const StethoscopeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
    <circle cx="18" cy="17" r="2.5" stroke="#059669" strokeWidth="1.8"/>
    <path d="M6 3C4.343 3 3 4.343 3 6v4a6 6 0 006 6h1a5 5 0 005-5V8"
      stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M15.5 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="#059669" strokeWidth="1.8"/>
    <path d="M15.5 8v3.5" stroke="#059669" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// ─── Reusable footer link column ──────────────────────────────────────────────
const FooterLinkColumn = ({ title, links }) => (
  <div>
    <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-300">{title}</h3>
    <ul className="flex flex-col gap-2">
      {links.map(({ label, to }) => (
        <li key={label}>
          <Link
            to={to}
            className="text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-150"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// ─── Social button ────────────────────────────────────────────────────────────
const SocialBtn = ({ icon, label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:border-emerald-500 hover:text-emerald-400 transition-colors duration-150"
  >
    {icon}
  </a>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-950 text-white" aria-label="Site footer">
      {/* ── Main footer grid ───────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">

          {/* ── Brand column ────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-900 to-blue-900 border border-emerald-700 group-hover:border-emerald-500 transition-colors duration-200">
                <StethoscopeIcon />
              </div>
              <span className="text-lg font-semibold tracking-tight select-none">
                <span className="text-gray-100">Its my </span>
                <span className="text-emerald-400">Doc</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm text-gray-400 leading-relaxed">
              Making expert healthcare accessible, affordable, and effortless for everyone — one appointment at a time.
            </p>

            {/* Contact info */}
            <div className="mt-6 flex flex-col gap-2.5">
              <a href="tel:+918000123456" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +91 80001 23456
              </a>
              <a href="mailto:support@itsmydoc.in" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                support@itsmydoc.in
              </a>
              <span className="inline-flex items-center gap-2 text-sm text-gray-400">
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Bandra West, Mumbai — 400050
              </span>
            </div>

            {/* Social links */}
            <div className="mt-6 flex gap-2">
              <SocialBtn icon={<FacebookIcon />}  label="Facebook"  href="#" />
              <SocialBtn icon={<TwitterIcon />}   label="Twitter"   href="#" />
              <SocialBtn icon={<InstagramIcon />} label="Instagram" href="#" />
              <SocialBtn icon={<LinkedInIcon />}  label="LinkedIn"  href="#" />
              <SocialBtn icon={<YoutubeIcon />}   label="YouTube"   href="#" />
            </div>
          </div>

          {/* ── Link columns ─────────────────────────────────────────── */}
          <FooterLinkColumn title="Services"      links={QUICK_LINKS}    />
          <FooterLinkColumn title="Specialties"   links={SPECIALTIES}    />
          <FooterLinkColumn title="Company"       links={COMPANY_LINKS}  />
        </div>

        {/* ── Trust badges row ────────────────────────────────────────── */}
        <div className="mt-12 flex flex-wrap gap-4 border-t border-gray-800 pt-10">
          {[
            { label: "NABL Certified",      icon: "🔬" },
            { label: "HIPAA Compliant",     icon: "🔒" },
            { label: "ISO 27001",           icon: "✅" },
            { label: "24/7 Support",        icon: "🕐" },
            { label: "Ministry Approved",   icon: "🏛️" },
          ].map(({ label, icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-xs text-gray-400"
            >
              <span>{icon}</span> {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────── */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {currentYear} Its my Doc. All rights reserved. Designed with ❤️ for better healthcare in India.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {LEGAL_LINKS.map(({ label, to }) => (
              <Link key={label} to={to} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
