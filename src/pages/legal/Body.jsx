// ─── Sub-components ───────────────────────────────────────────────────────────
const Section = ({ title, body }) => (
  <div className="mb-8">
    <h3 className="text-base font-semibold text-gray-900 mb-3">{title}</h3>
    <div className="text-sm text-gray-600 leading-relaxed space-y-3">
      {body.split("\n\n").map((para, i) => {
        const formatted = para.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) =>
          chunk.startsWith("**") && chunk.endsWith("**") ? (
            <strong key={j} className="text-gray-800">
              {chunk.slice(2, -2)}
            </strong>
          ) : (
            chunk
          ),
        );
        if (para.startsWith("- ")) {
          return (
            <ul key={i} className="list-disc list-inside space-y-1 pl-1">
              {para.split("\n").map((line, li) => (
                <li key={li}>{line.replace(/^- /, "")}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{formatted}</p>;
      })}
    </div>
  </div>
);

// ─── Body ─────────────────────────────────────────────────────────────────────
const LegalBody = ({ activeTab, onTabChange, sections, lastUpdated }) => (
  <main>
    {/* ── Hero ─────────────────────────────────────────────────────── */}
    <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16 px-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Legal &amp; Privacy
      </h1>
      <p className="mt-3 text-gray-500">
        We believe legal documents should be readable by humans, not just
        lawyers.
      </p>
    </section>

    {/* ── Tab switcher ─────────────────────────────────────────────── */}
    <div className="sticky top-16 z-40 bg-white border-b border-gray-200 px-4">
      <div className="mx-auto max-w-3xl flex">
        {[
          { id: "privacy", label: "Privacy Policy" },
          { id: "terms", label: "Terms of Use" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={[
              "px-6 py-4 text-sm font-medium border-b-2 transition-colors",
              activeTab === id
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-gray-500 hover:text-gray-800",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>
    </div>

    {/* ── Content ──────────────────────────────────────────────────── */}
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-8 text-xs text-gray-400">Last updated: {lastUpdated}</p>
      {sections.map((s) => (
        <Section key={s.title} {...s} />
      ))}
    </div>
  </main>
);

export default LegalBody;
