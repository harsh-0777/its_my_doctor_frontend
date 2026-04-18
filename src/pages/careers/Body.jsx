import { Link } from "react-router-dom";

// ─── Icons ────────────────────────────────────────────────────────────────────
const PERK_ICONS = {
  salary: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  remote: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  health: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  learning: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  leaves: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  growth: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const PerkCard = ({ icon, title, body }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
      {PERK_ICONS[icon]}
    </div>
    <h4 className="mt-4 font-semibold text-gray-900">{title}</h4>
    <p className="mt-2 text-sm text-gray-500 leading-relaxed">{body}</p>
  </div>
);

const JobCard = ({ title, dept, type, location, tags }) => (
  <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow sm:flex-row sm:items-start sm:justify-between">
    <div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="mt-1 text-sm text-gray-500">{dept} · {location}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">
            {t}
          </span>
        ))}
      </div>
    </div>
    <div className="flex items-start gap-2 sm:shrink-0">
      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
        {type}
      </span>
      <Link
        to="/contact"
        className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
      >
        Apply
      </Link>
    </div>
  </div>
);

// ─── Body ─────────────────────────────────────────────────────────────────────
const CareersBody = ({ perks, openings, depts, activeDept, onDeptChange, filtered, hiringSteps }) => (
  <main>
    {/* ── Hero ─────────────────────────────────────────────────── */}
    <section className="bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-20 px-4 text-center">
      <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700">
        We're hiring
      </span>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Build the future of{" "}
        <span className="text-emerald-600">healthcare in India</span>
      </h1>
      <p className="mt-5 mx-auto max-w-2xl text-lg text-gray-600">
        Join a team of 80+ people obsessed with making expert medical care
        accessible to every Indian. We move fast, own outcomes, and care deeply
        about the mission.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
        <span>📍 Offices in Mumbai, Bengaluru, Delhi</span>
        <span>🌐 80% of the team works remotely</span>
        <span>🚀 Backed by top-tier VCs</span>
      </div>
    </section>

    {/* ── Perks ────────────────────────────────────────────────── */}
    <section className="py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why work here?</h2>
          <p className="mt-2 text-gray-500">More than a job — a chance to fix healthcare.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p) => <PerkCard key={p.title} {...p} />)}
        </div>
      </div>
    </section>

    {/* ── Open Roles ───────────────────────────────────────────── */}
    <section className="bg-white py-20 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Open Positions</h2>
          <p className="mt-2 text-gray-500">
            {openings.length} roles across {depts.length - 1} departments
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {depts.map((d) => (
            <button
              key={d}
              onClick={() => onDeptChange(d)}
              className={[
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeDept === d
                  ? "bg-emerald-600 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:text-emerald-600",
              ].join(" ")}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {filtered.map((job) => <JobCard key={job.id} {...job} />)}
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't see a fit?{" "}
          <Link to="/contact" className="text-emerald-600 font-medium hover:underline">
            Send us your resume anyway
          </Link>{" "}
          — we're always looking for great people.
        </p>
      </div>
    </section>

    {/* ── Hiring process ───────────────────────────────────────── */}
    <section className="bg-gradient-to-r from-emerald-600 to-blue-600 py-16 px-4 text-center">
      <h2 className="text-2xl font-bold text-white sm:text-3xl">Our hiring process</h2>
      <div className="mt-8 mx-auto max-w-3xl grid gap-4 sm:grid-cols-4 text-white text-sm">
        {hiringSteps.map((step) => (
          <div key={step} className="rounded-xl bg-white/10 px-4 py-4 font-medium">
            {step}
          </div>
        ))}
      </div>
      <p className="mt-6 text-emerald-100 text-sm">
        We move fast — most hires complete the process in under 2 weeks.
      </p>
    </section>
  </main>
);

export default CareersBody;
