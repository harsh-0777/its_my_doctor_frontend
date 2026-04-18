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

// ─── Body ─────────────────────────────────────────────────────────────────────
const PressBody = ({ coverage, awards, stats }) => (
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
        {stats.map(({ value, label }) => (
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
          {coverage.map((c) => <CoverageCard key={c.headline} {...c} />)}
        </div>
      </div>
    </section>

    {/* ── Awards ─────────────────────────────────────────────────────── */}
    <section className="py-20 px-4">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Awards &amp; Recognition</h2>
        <div className="flex flex-col gap-4">
          {awards.map(({ year, title, body }) => (
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
);

export default PressBody;
