import Header from "../../layouts/header/index.jsx";
import Footer from "../../layouts/footer/index.jsx";

// ─── Data ─────────────────────────────────────────────────────────────────────
const COVERAGE = [
  {
    outlet: "Economic Times",
    date: "March 2024",
    headline: "ItsMyDoc raises ₹18 Cr in Series A to expand doctor discovery platform across India",
    logo: "ET",
    color: "bg-orange-100 text-orange-700",
    url: "#",
  },
  {
    outlet: "YourStory",
    date: "January 2024",
    headline: "How ItsMyDoc is solving India's doctor shortage problem one appointment at a time",
    logo: "YS",
    color: "bg-purple-100 text-purple-700",
    url: "#",
  },
  {
    outlet: "The Hindu BusinessLine",
    date: "November 2023",
    headline: "ItsMyDoc crosses 50,000 patients; eyes pan-India expansion by 2025",
    logo: "BL",
    color: "bg-red-100 text-red-700",
    url: "#",
  },
  {
    outlet: "Inc42",
    date: "September 2023",
    headline: "Video consultation startup ItsMyDoc sees 3x growth post-pandemic healthcare shift",
    logo: "I42",
    color: "bg-blue-100 text-blue-700",
    url: "#",
  },
  {
    outlet: "Mint",
    date: "June 2023",
    headline: "Digital health platforms like ItsMyDoc are making specialist care accessible in Tier-2 cities",
    logo: "M",
    color: "bg-teal-100 text-teal-700",
    url: "#",
  },
  {
    outlet: "NDTV Profit",
    date: "March 2023",
    headline: "ItsMyDoc founder on why India needs a new approach to primary care coordination",
    logo: "NP",
    color: "bg-indigo-100 text-indigo-700",
    url: "#",
  },
];

const AWARDS = [
  { year: "2024", title: "Best Health-tech Startup", body: "Startup India Awards, Government of India" },
  { year: "2023", title: "Top 50 Startups to Watch", body: "Inc42 Annual List" },
  { year: "2023", title: "Digital Innovation in Healthcare", body: "FICCI Health Excellence Awards" },
  { year: "2022", title: "Emerging Startup of the Year", body: "YourStory TechSparks" },
];

const STATS = [
  { value: "50+", label: "Media Features" },
  { value: "12", label: "Awards Won" },
  { value: "4", label: "Funding Rounds" },
  { value: "₹32 Cr+", label: "Total Raised" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const CoverageCard = ({ outlet, date, headline, logo, color, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${color}`}>
      {logo}
    </div>
    <div>
      <p className="text-xs text-gray-400">{outlet} · {date}</p>
      <p className="mt-1 text-sm font-medium text-gray-800 leading-snug group-hover:text-emerald-700 transition-colors">
        {headline}
      </p>
    </div>
  </a>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const PressPage = () => (
  <div className="min-h-screen bg-[#f7f3ee]">
    <Header />

    <main>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50 py-20 px-4 text-center">
        <span className="inline-block rounded-full bg-violet-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-violet-700">
          Press &amp; Media
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          ItsMyDoc in the news
        </h1>
        <p className="mt-5 mx-auto max-w-xl text-lg text-gray-600">
          We're proud to be recognised by leading media for our work in making
          healthcare accessible across India.
        </p>

        {/* Press contact */}
        <div className="mt-8 inline-flex flex-col items-center gap-1 rounded-2xl border border-violet-200 bg-white px-8 py-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-900">Press Enquiries</p>
          <a href="mailto:press@itsmydoc.in" className="text-emerald-600 font-medium hover:underline text-sm">
            press@itsmydoc.in
          </a>
          <p className="text-xs text-gray-400">We respond within 4 business hours.</p>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <section className="py-14 px-4">
        <div className="mx-auto max-w-4xl grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="rounded-2xl border border-gray-200 bg-white px-4 py-6 text-center shadow-sm">
              <p className="text-2xl font-bold text-emerald-600">{value}</p>
              <p className="mt-1 text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Media Coverage ─────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Coverage</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {COVERAGE.map((c) => <CoverageCard key={c.headline} {...c} />)}
          </div>
        </div>
      </section>

      {/* ── Awards ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Awards &amp; Recognition</h2>
          <div className="flex flex-col gap-4">
            {AWARDS.map(({ year, title, body }) => (
              <div key={title} className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-xs font-bold text-amber-700">
                  {year}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{title}</p>
                  <p className="text-sm text-gray-500">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Press Kit ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-violet-600 to-blue-600 py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-white">Download our Press Kit</h2>
        <p className="mt-3 text-violet-100">
          Logos, brand assets, founder photos, and company fact sheet.
        </p>
        <a
          href="#"
          className="mt-6 inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors shadow-sm"
        >
          Download Press Kit (.zip)
        </a>
      </section>
    </main>

    <Footer />
  </div>
);

export default PressPage;
