// ─── Stats data ────────────────────────────────────────────────────────────────
const STATS = [
  { value: "500+",    label: "Expert Doctors" },
  { value: "50,000+", label: "Happy Patients" },
  { value: "30+",    label: "Specializations" },
  { value: "98%",    label: "Satisfaction Rate" },
  { value: "24/7",   label: "Available Support" },
  { value: "200+",   label: "Lab Tests Offered" },
  { value: "15+",    label: "Years of Excellence" },
  { value: "100%",   label: "Verified Doctors" },
];

// ─── Separator dot ────────────────────────────────────────────────────────────
const Separator = () => (
  <span className="mx-6 inline-block h-1 w-1 rounded-full bg-emerald-300/60 align-middle" aria-hidden="true" />
);

// ─── Single stat item ─────────────────────────────────────────────────────────
const StatItem = ({ value, label }) => (
  <span className="inline-flex items-center gap-2 whitespace-nowrap">
    <span className="text-base font-bold text-white">{value}</span>
    <span className="text-sm text-emerald-100/80">{label}</span>
  </span>
);

// ─── InfoTicker ───────────────────────────────────────────────────────────────
const InfoTicker = () => {
  // Duplicate items so the marquee loops seamlessly
  const items = [...STATS, ...STATS];

  return (
    <div
      className="w-full overflow-hidden bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 py-3 shadow-md"
      aria-label="Quick statistics"
    >
      <div className="ticker-track flex">
        {items.map((stat, i) => (
          <span key={i} className="inline-flex items-center">
            <StatItem value={stat.value} label={stat.label} />
            <Separator />
          </span>
        ))}
      </div>

      <style>{`
        .ticker-track {
          animation: ticker 30s linear infinite;
          width: max-content;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default InfoTicker;
