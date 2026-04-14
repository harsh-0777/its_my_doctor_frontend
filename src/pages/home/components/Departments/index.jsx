import { Link } from "react-router-dom";

// ─── SVG department icons (inline, self-contained) ────────────────────────────
const HeartIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <path d="M24 40S6 28 6 16a9 9 0 0118-1.5A9 9 0 0142 16c0 12-18 24-18 24z"
      fill="#fde8e8" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);
const BrainIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <ellipse cx="17" cy="24" rx="9" ry="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2"/>
    <ellipse cx="31" cy="24" rx="9" ry="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2"/>
    <line x1="24" y1="14" x2="24" y2="34" stroke="#7c3aed" strokeWidth="2"/>
  </svg>
);
const BoneIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <rect x="16" y="10" width="16" height="28" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
    <circle cx="16" cy="13" r="4" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2"/>
    <circle cx="32" cy="13" r="4" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2"/>
    <circle cx="16" cy="35" r="4" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2"/>
    <circle cx="32" cy="35" r="4" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2"/>
  </svg>
);
const BabyIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <circle cx="24" cy="14" r="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
    <path d="M10 38c0-8 6-13 14-13s14 5 14 13" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="21" cy="13" r="1.5" fill="#f59e0b"/>
    <circle cx="27" cy="13" r="1.5" fill="#f59e0b"/>
    <path d="M21 18q3 2 6 0" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const SkinIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <path d="M24 8C14 8 8 14 8 24s6 16 16 16 16-6 16-16S34 8 24 8z" fill="#fce7f3" stroke="#db2777" strokeWidth="2"/>
    <path d="M18 24q2-4 6-4t6 4" stroke="#db2777" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="24" cy="20" r="2" fill="#db2777"/>
  </svg>
);
const EyeIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <path d="M6 24s7-12 18-12 18 12 18 12-7 12-18 12S6 24 6 24z" fill="#ecfdf5" stroke="#059669" strokeWidth="2"/>
    <circle cx="24" cy="24" r="6" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
    <circle cx="24" cy="24" r="2.5" fill="#059669"/>
  </svg>
);
const ToothIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <path d="M16 10c-4 0-7 3-7 7 0 3 1 5 2 8l3 13c1 3 3 3 4 0l2-8h8l2 8c1 3 3 3 4 0l3-13c1-3 2-5 2-8 0-4-3-7-7-7-3 0-5 2-6 2s-3-2-6-2z"
      fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);
const LungsIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <path d="M24 8v8" stroke="#0891b2" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 16c-6 2-14 8-14 16 0 4 2 6 6 6 3 0 5-2 8-8" stroke="#0891b2" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 16c6 2 14 8 14 16 0 4-2 6-6 6-3 0-5-2-8-8" stroke="#0891b2" strokeWidth="2" strokeLinecap="round"/>
    <ellipse cx="24" cy="30" rx="4" ry="5" fill="#cffafe" stroke="#0891b2" strokeWidth="2"/>
  </svg>
);
const WombIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <path d="M24 10c-8 0-14 6-14 14 0 6 4 11 10 13v5" stroke="#ec4899" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 10c8 0 14 6 14 14 0 6-4 11-10 13v5" stroke="#ec4899" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="24" cy="22" r="6" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
    <circle cx="24" cy="22" r="2.5" fill="#ec4899"/>
  </svg>
);
const EarIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
    <path d="M30 14a10 10 0 010 20c-3 0-5-2-5-5 0-2 1-3 3-5s3-4 3-6a6 6 0 00-12 0c0 4 3 7 5 10"
      stroke="#d97706" strokeWidth="2" strokeLinecap="round" fill="#fef3c7"/>
    <path d="M18 34c0 3 2 5 5 5" stroke="#d97706" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// ─── Department data ──────────────────────────────────────────────────────────
const DEPARTMENTS = [
  { icon: <HeartIcon />,  name: "Cardiology",     desc: "Heart & blood vessel care", color: "bg-red-50",    border: "border-red-100",    hover: "hover:border-red-300"   },
  { icon: <BrainIcon />,  name: "Neurology",      desc: "Brain & nervous system",    color: "bg-violet-50", border: "border-violet-100", hover: "hover:border-violet-300"},
  { icon: <BoneIcon />,   name: "Orthopedics",    desc: "Bones, joints & muscles",   color: "bg-blue-50",   border: "border-blue-100",   hover: "hover:border-blue-300"  },
  { icon: <BabyIcon />,   name: "Pediatrics",     desc: "Children's health & care",  color: "bg-amber-50",  border: "border-amber-100",  hover: "hover:border-amber-300" },
  { icon: <SkinIcon />,   name: "Dermatology",    desc: "Skin, hair & nails",        color: "bg-pink-50",   border: "border-pink-100",   hover: "hover:border-pink-300"  },
  { icon: <EyeIcon />,    name: "Ophthalmology",  desc: "Eye care & vision health",  color: "bg-emerald-50",border: "border-emerald-100",hover: "hover:border-emerald-300"},
  { icon: <LungsIcon />,  name: "Pulmonology",    desc: "Lungs & respiratory tract", color: "bg-cyan-50",   border: "border-cyan-100",   hover: "hover:border-cyan-300"  },
  { icon: <WombIcon />,   name: "Gynecology",     desc: "Women's health & wellness", color: "bg-pink-50",   border: "border-pink-100",   hover: "hover:border-fuchsia-300"},
  { icon: <ToothIcon />,  name: "Dentistry",      desc: "Oral health & dental care", color: "bg-green-50",  border: "border-green-100",  hover: "hover:border-green-300" },
  { icon: <EarIcon />,    name: "ENT",            desc: "Ear, nose & throat care",   color: "bg-amber-50",  border: "border-amber-100",  hover: "hover:border-orange-300"},
];

// ─── DepartmentCard ───────────────────────────────────────────────────────────
const DepartmentCard = ({ icon, name, desc, color, border, hover }) => (
  <Link
    to="/find-doctor"
    className={[
      "group flex flex-col items-center gap-3 rounded-2xl border p-5 text-center",
      "transition-all duration-200 cursor-pointer",
      color, border, hover,
      "hover:shadow-md hover:-translate-y-0.5",
    ].join(" ")}
  >
    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform duration-200">
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">{name}</p>
      <p className="mt-0.5 text-xs text-gray-500 leading-snug">{desc}</p>
    </div>
  </Link>
);

// ─── Departments section ──────────────────────────────────────────────────────
const Departments = () => (
  <section className="w-full bg-white py-16 px-4" id="departments">
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-10 text-center">
        <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-600 border border-emerald-100">
          Our Departments
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
          30+ Medical Specializations
        </h2>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
          World-class specialists across all major medical fields, all under one roof.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {DEPARTMENTS.map((dept) => (
          <DepartmentCard key={dept.name} {...dept} />
        ))}
      </div>

      {/* View all link */}
      <div className="mt-10 text-center">
        <Link
          to="/find-doctor"
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-500 px-6 py-2.5 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors duration-150"
        >
          View All Departments
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  </section>
);

export default Departments;
