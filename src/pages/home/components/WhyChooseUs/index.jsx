// ─── USP data ─────────────────────────────────────────────────────────────────
const USPS = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <circle cx="24" cy="24" r="18" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
        <path d="M16 24l6 6 10-12" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "100% Verified Doctors",
    description:
      "Every doctor on our platform is background-checked, credential-verified, and peer-reviewed before going live.",
    stat: "500+ Doctors",
    statLabel: "All Verified",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <circle cx="24" cy="20" r="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
        <path d="M10 42c0-8 6-13 14-13s14 5 14 13" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 13v7l4 4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Instant Appointments",
    description:
      "Book same-day or advance appointments in under 60 seconds. No waiting rooms, no phone queues.",
    stat: "< 60 sec",
    statLabel: "Booking Time",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
        <path d="M16 24h16M24 16v16" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "24/7 Care Available",
    description:
      "Round-the-clock access to doctors, medical advice, and emergency consultations, every day of the year.",
    stat: "24 / 7",
    statLabel: "365 Days",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path d="M8 36V20l16-12 16 12v16H8z" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" strokeLinejoin="round"/>
        <rect x="18" y="26" width="12" height="10" rx="2" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="1.5"/>
        <circle cx="24" cy="16" r="4" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Private &amp; Secure",
    description:
      "Your medical data is end-to-end encrypted. We are fully HIPAA-compliant and never share your information.",
    stat: "256-bit",
    statLabel: "Encryption",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path d="M24 8l4 8 9 1.5-6.5 6.5 1.5 9L24 29l-8 4 1.5-9L11 17.5l9-1.5 4-8z"
          fill="#fce7f3" stroke="#db2777" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    title: "98% Satisfaction Rate",
    description:
      "Thousands of patients rate their experience 5 stars. We obsess over every detail of your care journey.",
    stat: "98%",
    statLabel: "Patient Rating",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <rect x="8" y="12" width="32" height="24" rx="4" fill="#ecfdf5" stroke="#059669" strokeWidth="2"/>
        <path d="M16 20h16M16 28h10" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="38" cy="12" r="6" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
        <path d="M36 12h4M38 10v4" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Digital Prescriptions",
    description:
      "Receive digital prescriptions directly in the app, stored securely and shareable with any pharmacy.",
    stat: "100%",
    statLabel: "Paperless",
  },
];

// ─── USPCard ──────────────────────────────────────────────────────────────────
const USPCard = ({ icon, title, description, stat, statLabel }) => (
  <div className="group relative flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
    {/* Subtle gradient corner accent */}
    <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-gradient-to-br from-emerald-50 to-blue-50 opacity-60 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

    <div className="relative">{icon}</div>

    <div className="relative">
      <h3 className="text-base font-bold text-gray-900" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>

    {/* Stat badge */}
    <div className="relative mt-auto pt-3 border-t border-gray-50">
      <span className="text-xl font-extrabold text-emerald-600">{stat}</span>
      <span className="ml-2 text-xs text-gray-400">{statLabel}</span>
    </div>
  </div>
);

// ─── WhyChooseUs section ──────────────────────────────────────────────────────
const WhyChooseUs = () => (
  <section className="w-full bg-white py-16 px-4" id="why-us">
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-block rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-violet-600 border border-violet-100">
          Why MediBook
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
          Healthcare You Can Trust
        </h2>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
          We built MediBook around one mission — making expert healthcare accessible, affordable, and effortless for everyone.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {USPS.map((usp) => (
          <USPCard key={usp.title} {...usp} />
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
