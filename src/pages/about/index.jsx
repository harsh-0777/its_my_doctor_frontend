import { Link } from "react-router-dom";
import Header from "../../layouts/header/index.jsx";
import Footer from "../../layouts/footer/index.jsx";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "50,000+", label: "Patients Served" },
  { value: "1,200+",  label: "Verified Doctors" },
  { value: "120+",    label: "Specializations" },
  { value: "98%",     label: "Satisfaction Rate" },
];

const TIMELINE = [
  {
    year: "2020",
    title: "The Idea",
    body: "Founded in Mumbai by a team frustrated with broken appointment booking systems, ItsMyDoc was born from a single belief: healthcare should be simple.",
  },
  {
    year: "2021",
    title: "First 1,000 Patients",
    body: "Launched in Maharashtra with 50 partner doctors. Reached our first thousand patients within 3 months, validated by real need.",
  },
  {
    year: "2022",
    title: "Series A & Expansion",
    body: "Raised ₹18 Cr in Series A funding. Expanded to Delhi, Bengaluru, and Hyderabad. Crossed 500 verified doctor profiles.",
  },
  {
    year: "2023",
    title: "Video Consultation Launch",
    body: "Introduced real-time video consultations, removing the need to travel for follow-ups and specialist consultations.",
  },
  {
    year: "2024",
    title: "50,000 Patients & Counting",
    body: "Today we serve over 50,000 patients across 8 cities with 1,200+ doctors. Our mission hasn't changed — make expert care accessible to all.",
  },
];

const TEAM = [
  {
    name: "Dr. Aakash Sharma",
    role: "Co-founder & CEO",
    bio: "Former cardiologist-turned-entrepreneur. Built ItsMyDoc after watching patients struggle to navigate the healthcare system.",
    initials: "AS",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Priya Menon",
    role: "Co-founder & CTO",
    bio: "10 years in health-tech at Practo and Niramai. Leads all product and engineering at ItsMyDoc.",
    initials: "PM",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Rahul Desai",
    role: "Chief Medical Officer",
    bio: "Ex-head of telemedicine at Apollo Hospitals. Ensures every doctor on our platform meets the highest clinical standards.",
    initials: "RD",
    color: "bg-violet-100 text-violet-700",
  },
  {
    name: "Sneha Kapoor",
    role: "Head of Patient Experience",
    bio: "Background in healthcare UX. Champions the voice of the patient across every product decision.",
    initials: "SK",
    color: "bg-rose-100 text-rose-700",
  },
];

const VALUES = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Patient First",
    body: "Every decision — from UX to pricing — starts with one question: does this make the patient's life easier?",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Trust & Safety",
    body: "All doctors are MBBS-verified. Patient data is encrypted, HIPAA-compliant, and never sold.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
    title: "Accessibility",
    body: "Available in English and Hindi. Designed for 2G connections. Healthcare without barriers.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Speed & Reliability",
    body: "Book an appointment in under 60 seconds. 99.9% uptime — because healthcare can't afford downtime.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const StatCard = ({ value, label }) => (
  <div className="flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm">
    <span className="text-3xl font-bold text-emerald-600">{value}</span>
    <span className="text-sm text-gray-500">{label}</span>
  </div>
);

const TimelineItem = ({ year, title, body, isLast }) => (
  <div className="relative flex gap-6">
    <div className="flex flex-col items-center">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
        {year.slice(2)}
      </div>
      {!isLast && <div className="mt-2 w-px flex-1 bg-emerald-200" />}
    </div>
    <div className="pb-10">
      <p className="text-xs font-semibold text-emerald-600">{year}</p>
      <h4 className="mt-0.5 text-base font-semibold text-gray-900">{title}</h4>
      <p className="mt-1 text-sm text-gray-600 leading-relaxed">{body}</p>
    </div>
  </div>
);

const TeamCard = ({ name, role, bio, initials, color }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold ${color}`}>
      {initials}
    </div>
    <h4 className="mt-4 text-base font-semibold text-gray-900">{name}</h4>
    <p className="text-sm font-medium text-emerald-600">{role}</p>
    <p className="mt-2 text-sm text-gray-500 leading-relaxed">{bio}</p>
  </div>
);

const ValueCard = ({ icon, title, body }) => (
  <div className="flex gap-4">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="mt-1 text-sm text-gray-500 leading-relaxed">{body}</p>
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const AboutPage = () => (
  <div className="min-h-screen bg-[#f7f3ee]">
    <Header />

    <main>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Our Story
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Making healthcare{" "}
            <span className="text-emerald-600">simple for every Indian</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            ItsMyDoc started with a single belief — no one should struggle to see a
            good doctor. We're building India's most trusted platform for booking
            appointments, consulting online, and managing your family's health.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/find-doctor"
              className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors shadow-sm"
            >
              Find a Doctor
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => <StatCard key={s.label} {...s} />)}
        </div>
      </section>

      {/* ── Mission ────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="mx-auto max-w-5xl grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Our Mission
            </span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Expert care, within reach of every patient
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              India has one of the world's largest doctor shortages. Tier-2 and
              tier-3 cities often have a single specialist for hundreds of thousands
              of patients. ItsMyDoc bridges this gap — connecting patients to
              verified specialists via in-clinic appointments, video consults, and
              instant chat.
            </p>
            <p className="mt-3 text-gray-600 leading-relaxed">
              We don't just book appointments. We give patients context — ratings,
              qualifications, wait times, and transparent fees — so they can make
              informed decisions about their own health.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {VALUES.map((v) => <ValueCard key={v.title} {...v} />)}
          </div>
        </div>
      </section>

      {/* ── Story / Timeline ───────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Timeline
            </span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">How we got here</h2>
          </div>
          <div>
            {TIMELINE.map((item, i) => (
              <TimelineItem
                key={item.year}
                {...item}
                isLast={i === TIMELINE.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Leadership
            </span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">The people behind ItsMyDoc</h2>
            <p className="mt-3 text-gray-500">
              Doctors, engineers, and healthcare advocates — united by a single mission.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => <TeamCard key={m.name} {...m} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-emerald-600 to-blue-600 py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Want to join our mission?
        </h2>
        <p className="mt-3 text-emerald-100">
          We're hiring across engineering, design, operations, and clinical roles.
        </p>
        <Link
          to="/careers"
          className="mt-6 inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors shadow-sm"
        >
          See Open Roles
        </Link>
      </section>
    </main>

    <Footer />
  </div>
);

export default AboutPage;
