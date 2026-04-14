import { Link } from "react-router-dom";

// ─── Feature pills ─────────────────────────────────────────────────────────────
const PILLS = [
  { icon: "⚡", text: "Instant Booking"      },
  { icon: "🏠", text: "Home Lab Collection"  },
  { icon: "📱", text: "Video Consultations"  },
  { icon: "🔒", text: "Secure & Private"     },
];

// ─── CTABanner ────────────────────────────────────────────────────────────────
const CTABanner = () => (
  <section className="w-full py-16 px-4 bg-white" id="cta">
    <div className="mx-auto max-w-5xl">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 px-8 py-14 text-center shadow-xl">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-12 -left-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-60 w-60 rounded-full bg-blue-400/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute top-8 right-16 h-24 w-24 rounded-full bg-white/5" aria-hidden="true" />

        {/* Content */}
        <div className="relative">
          <span className="inline-block rounded-full border border-white/30 bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white mb-4">
            Get Started Today — It&apos;s Free
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Your Doctor Is<br className="hidden sm:block" /> Just a Tap Away
          </h2>

          <p className="mt-4 text-emerald-50 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Join 50,000+ patients who trust MediBook for fast, verified, and affordable healthcare — anytime, anywhere.
          </p>

          {/* Feature pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {PILLS.map(({ icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white"
              >
                <span>{icon}</span> {text}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-emerald-700 shadow-lg hover:bg-emerald-50 active:scale-95 transition-all duration-150"
            >
              Create Free Account
            </Link>
            <Link
              to="/find-doctor"
              className="rounded-xl border border-white/40 bg-white/10 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors duration-150"
            >
              Browse Doctors
            </Link>
          </div>

          <p className="mt-5 text-xs text-emerald-100/70">
            No credit card required &bull; Cancel anytime &bull; Fully private
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default CTABanner;
