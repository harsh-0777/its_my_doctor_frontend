import { Link } from "react-router-dom";

// ─── Lab test data ────────────────────────────────────────────────────────────
const LAB_TESTS = [
  {
    emoji: "🩸",
    name: "Complete Blood Count",
    abbr: "CBC",
    turnaround: "Same Day",
    price: "₹299",
    tag: "Most Popular",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    emoji: "🫀",
    name: "Lipid Profile",
    abbr: "Heart Health",
    turnaround: "24 Hours",
    price: "₹499",
    tag: "Recommended",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    emoji: "🧬",
    name: "HbA1c — Diabetes",
    abbr: "Blood Sugar",
    turnaround: "Same Day",
    price: "₹349",
    tag: "Trending",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    emoji: "🦠",
    name: "Thyroid Panel",
    abbr: "TSH / T3 / T4",
    turnaround: "24 Hours",
    price: "₹599",
    tag: null,
    tagColor: "",
  },
  {
    emoji: "🧪",
    name: "Urine Routine",
    abbr: "Urinalysis",
    turnaround: "Same Day",
    price: "₹149",
    tag: "Basic",
    tagColor: "bg-gray-100 text-gray-600",
  },
  {
    emoji: "🫁",
    name: "Chest X-Ray",
    abbr: "Radiology",
    turnaround: "1 Hour",
    price: "₹399",
    tag: "Fast Report",
    tagColor: "bg-violet-100 text-violet-700",
  },
  {
    emoji: "🧠",
    name: "MRI Brain",
    abbr: "Neurology",
    turnaround: "Same Day",
    price: "₹3,499",
    tag: "Advanced",
    tagColor: "bg-pink-100 text-pink-700",
  },
  {
    emoji: "💉",
    name: "Covid-19 RT-PCR",
    abbr: "Viral Test",
    turnaround: "6 Hours",
    price: "₹799",
    tag: null,
    tagColor: "",
  },
];

// ─── LabTestCard ──────────────────────────────────────────────────────────────
const LabTestCard = ({ emoji, name, abbr, turnaround, price, tag, tagColor }) => (
  <div className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    {/* Icon + tag row */}
    <div className="flex items-start justify-between">
      <span className="text-3xl select-none" role="img" aria-hidden="true">{emoji}</span>
      {tag && (
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${tagColor}`}>
          {tag}
        </span>
      )}
    </div>

    {/* Info */}
    <div className="mt-3 flex-1">
      <p className="text-sm font-semibold text-gray-800 leading-snug">{name}</p>
      <p className="mt-0.5 text-xs text-gray-400">{abbr}</p>
    </div>

    {/* Footer */}
    <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
      <div>
        <p className="text-xs text-gray-400">Report in</p>
        <p className="text-xs font-semibold text-gray-600">{turnaround}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-400">Starting at</p>
        <p className="text-sm font-bold text-emerald-600">{price}</p>
      </div>
    </div>
  </div>
);

// ─── LabTests section ─────────────────────────────────────────────────────────
const LabTests = () => (
  <section className="w-full bg-[#f7f3ee] py-16 px-4" id="lab-tests">
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-600 border border-blue-100">
            Diagnostic Centre
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Lab Tests &amp; Diagnostics
          </h2>
          <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-lg">
            200+ tests. Sample collected at home. NABL-accredited labs. Reports delivered digitally.
          </p>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end sm:gap-2">
          {[
            { icon: "🏠", text: "Home Collection" },
            { icon: "🔬", text: "NABL Certified" },
            { icon: "⚡", text: "Fast Reports"    },
          ].map(({ icon, text }) => (
            <span key={text} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
              <span>{icon}</span> {text}
            </span>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {LAB_TESTS.map((test) => (
          <LabTestCard key={test.name} {...test} />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 text-center">
        <Link
          to="/lab-tests"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 active:bg-blue-700 transition-colors duration-150"
        >
          Book a Lab Test
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  </section>
);

export default LabTests;
