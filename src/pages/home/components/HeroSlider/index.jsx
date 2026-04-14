import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

import Slide1 from "../../../../assets/images/illustrations/Home_Slider_1.jpg";
import Slide2 from "../../../../assets/images/illustrations/Home_Slider_2.jpg";
import Slide3 from "../../../../assets/images/illustrations/Home_Slider_3.jpg";
import Slide4 from "../../../../assets/images/illustrations/Home_Slider_4.jpg";
import Slide5 from "../../../../assets/images/illustrations/Home_Slider_5.png";

// ─── Config ───────────────────────────────────────────────────────────────────
const AUTO_INTERVAL = 4500; // ms between auto-advances

// ─── Slide data ───────────────────────────────────────────────────────────────
const SLIDES = [
  {
    image: Slide1,
    tag: "Trusted Healthcare",
    heading: "Your Health,\nOur Priority",
    subtext: "Connect with 500+ verified specialists across 30+ departments and get the care you deserve.",
    primaryCTA: { label: "Book Appointment", to: "/find-doctor" },
    secondaryCTA: { label: "Explore Doctors", to: "/find-doctor" },
    accent: "from-emerald-600 to-emerald-500",
  },
  {
    image: Slide2,
    tag: "Expert Medical Care",
    heading: "Specialist Doctors,\nAvailable 24/7",
    subtext: "From general physicians to super-specialists — real-time availability, instant booking.",
    primaryCTA: { label: "Find a Doctor", to: "/find-doctor" },
    secondaryCTA: { label: "View Specializations", to: "/find-doctor" },
    accent: "from-blue-600 to-blue-500",
  },
  {
    image: Slide3,
    tag: "Lab Tests at Home",
    heading: "Comprehensive\nLab Testing",
    subtext: "Book 200+ diagnostic tests. Sample collection from your doorstep. Reports in 24 hours.",
    primaryCTA: { label: "Book a Test", to: "/lab-tests" },
    secondaryCTA: { label: "View All Tests", to: "/lab-tests" },
    accent: "from-violet-600 to-violet-500",
  },
  {
    image: Slide4,
    tag: "Video Consultation",
    heading: "See a Doctor\nFrom Anywhere",
    subtext: "High-quality video consultations from the comfort of your home, starting at just ₹199.",
    primaryCTA: { label: "Start Consultation", to: "/video-consultant" },
    secondaryCTA: { label: "How It Works", to: "/video-consultant" },
    accent: "from-teal-600 to-teal-500",
  },
  {
    image: Slide5,
    tag: "50,000+ Happy Patients",
    heading: "Trusted by\nThousands",
    subtext: "Join a community of patients who chose smarter, faster, and better healthcare with MediBook.",
    primaryCTA: { label: "Join Now", to: "/signup" },
    secondaryCTA: { label: "Read Stories", to: "/" },
    accent: "from-emerald-600 to-blue-600",
  },
];

const TOTAL = SLIDES.length;

// ─── Arrow icons ──────────────────────────────────────────────────────────────
const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// ─── HeroSlider ───────────────────────────────────────────────────────────────
const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  // ── Helpers ────────────────────────────────────────────────────────────────
  // Start (or restart) the auto-advance interval
  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % TOTAL);
    }, AUTO_INTERVAL);
  }, []);

  // Navigate to a specific slide and reset the timer so the full interval
  // elapses again after a manual navigation — prevents an immediate auto-jump.
  const goTo = useCallback((idx) => {
    setCurrent(((idx % TOTAL) + TOTAL) % TOTAL);
    startInterval();
  }, [startInterval]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // ── Auto-advance on mount; clear on unmount ────────────────────────────────
  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval]);

  // ── Keyboard support ───────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative h-[520px] sm:h-[600px] lg:h-[680px] w-full overflow-hidden"
      aria-label="Featured healthcare services"
    >
      {/* ── Background images ─────────────────────────────────────── */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className={[
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            i === current ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <img
            src={s.image}
            alt=""
            className="h-full w-full object-cover object-center"
            loading={i === 0 ? "eager" : "lazy"}
          />
          {/* Dark gradient overlays for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* ── Slide content ─────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="max-w-xl">
            {/* Tag pill */}
            <span
              className={[
                "inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white mb-4",
                `bg-gradient-to-r ${slide.accent}`,
              ].join(" ")}
            >
              {slide.tag}
            </span>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white whitespace-pre-line drop-shadow-lg">
              {slide.heading}
            </h1>

            {/* Subtext */}
            <p className="mt-4 text-base sm:text-lg text-gray-200 leading-relaxed max-w-md">
              {slide.subtext}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={slide.primaryCTA.to}
                className={[
                  "rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg",
                  "bg-gradient-to-r",
                  slide.accent,
                  "hover:opacity-90 active:scale-95 transition-all duration-150",
                ].join(" ")}
              >
                {slide.primaryCTA.label}
              </Link>
              <Link
                to={slide.secondaryCTA.to}
                className="rounded-xl border border-white/40 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors duration-150"
              >
                {slide.secondaryCTA.label}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Prev / Next arrows ────────────────────────────────────── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 backdrop-blur-sm p-2.5 text-white hover:bg-white/30 active:scale-90 transition-all duration-150 border border-white/20"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 backdrop-blur-sm p-2.5 text-white hover:bg-white/30 active:scale-90 transition-all duration-150 border border-white/20"
      >
        <ChevronRight />
      </button>

      {/* ── Dot indicators ────────────────────────────────────────── */}
      <div
        className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 flex gap-2"
        role="tablist"
        aria-label="Slide indicators"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={[
              "rounded-full transition-all duration-300",
              i === current
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/70",
            ].join(" ")}
          />
        ))}
      </div>

      {/* ── Progress bar (resets key on slide change to restart animation) ── */}
      <div className="absolute bottom-0 left-0 z-20 h-[3px] w-full bg-white/10">
        <div
          key={current}
          className="h-full bg-white/60"
          style={{ animation: `slideProgress ${AUTO_INTERVAL}ms linear forwards` }}
        />
      </div>

      <style>{`
        @keyframes slideProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
