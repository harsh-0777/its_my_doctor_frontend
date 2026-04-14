import { useState } from "react";

// ─── Star rating ──────────────────────────────────────────────────────────────
const StarRating = ({ rating }) => (
  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`h-4 w-4 ${i < rating ? "text-amber-400" : "text-gray-200"}`}
        viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
  </div>
);

// ─── Testimonial data ─────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Software Engineer, Pune",
    initials: "PS",
    avatarColor: "bg-emerald-100 text-emerald-700",
    rating: 5,
    department: "Cardiology",
    quote:
      "I was able to book an appointment with a cardiologist the same evening I had symptoms. The doctor was thorough, the video call quality was perfect, and I had my prescription digitally within minutes. Absolutely seamless experience.",
  },
  {
    name: "Rajesh Kumar",
    role: "Teacher, Mumbai",
    initials: "RK",
    avatarColor: "bg-blue-100 text-blue-700",
    rating: 5,
    department: "Orthopedics",
    quote:
      "After my knee injury, I needed an orthopedic consultation urgently. MediBook connected me to a specialist within hours. The lab test booking and home sample collection saved me a full day of hospital visits. Highly recommended!",
  },
  {
    name: "Ananya Reddy",
    role: "New Mother, Hyderabad",
    initials: "AR",
    avatarColor: "bg-pink-100 text-pink-700",
    rating: 5,
    department: "Pediatrics",
    quote:
      "Finding a trusted pediatrician for my newborn was stressful until I discovered MediBook. The verified doctor profiles, reviews, and quick booking made all the difference. Now I use it for my whole family.",
  },
  {
    name: "Mohammed Farouk",
    role: "Business Owner, Chennai",
    initials: "MF",
    avatarColor: "bg-amber-100 text-amber-700",
    rating: 4,
    department: "Dermatology",
    quote:
      "Got a skin consult done during my lunch break via video call. No commute, no waiting room, doctor was knowledgeable. I got my prescription and the pharmacy was already notified. This is how healthcare should work.",
  },
  {
    name: "Sunita Verma",
    role: "Retired Principal, Delhi",
    initials: "SV",
    avatarColor: "bg-violet-100 text-violet-700",
    rating: 5,
    department: "General Medicine",
    quote:
      "As someone who isn't very tech-savvy, I was nervous about using an app for my health. But MediBook was so easy to navigate. My daughter helped me the first time, but now I book my own appointments confidently.",
  },
  {
    name: "Arjun Nair",
    role: "Architect, Bangalore",
    initials: "AN",
    avatarColor: "bg-teal-100 text-teal-700",
    rating: 5,
    department: "Neurology",
    quote:
      "The lab test at home feature is a game changer. I ordered a full neurological panel, the technician arrived on time, and reports were in my MediBook dashboard by evening. Professional all the way through.",
  },
];

// ─── TestimonialCard ──────────────────────────────────────────────────────────
const TestimonialCard = ({ name, role, initials, avatarColor, rating, department, quote }) => (
  <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm h-full">
    {/* Quote mark */}
    <svg className="h-7 w-7 text-emerald-100" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M10 8C6 8 4 11 4 14c0 3 2 5 5 5 2 0 4-1 4-3 0-2-1-3-3-3-.5 0-1 .1-1.3.2C9 11.7 10 10 12 9.2L10 8zm14 0c-4 0-6 3-6 6 0 3 2 5 5 5 2 0 4-1 4-3 0-2-1-3-3-3-.5 0-1 .1-1.3.2 1.3-1.5 2.3-3.2 4.3-4L24 8z"/>
    </svg>

    {/* Quote text */}
    <p className="text-sm text-gray-600 leading-relaxed flex-1">{quote}</p>

    {/* Rating */}
    <StarRating rating={rating} />

    {/* Author */}
    <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${avatarColor}`}>
        {initials}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-800">{name}</p>
        <p className="text-xs text-gray-400">{role}</p>
      </div>
      <span className="ml-auto shrink-0 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-100">
        {department}
      </span>
    </div>
  </div>
);

// ─── Testimonials section ─────────────────────────────────────────────────────
const Testimonials = () => {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(TESTIMONIALS.length / perPage);
  const visible = TESTIMONIALS.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="w-full bg-[#f7f3ee] py-16 px-4" id="testimonials">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-600 border border-amber-100">
            Patient Stories
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            What Our Patients Say
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            Real stories from real patients who experienced better healthcare with MediBook.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        {/* Pagination dots */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                className={[
                  "rounded-full transition-all duration-200",
                  i === page ? "w-6 h-2 bg-emerald-500" : "w-2 h-2 bg-gray-300 hover:bg-gray-400",
                ].join(" ")}
              />
            ))}
          </div>
        )}

        {/* Overall rating summary */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 rounded-2xl border border-gray-100 bg-white px-8 py-6 shadow-sm max-w-lg mx-auto">
          <div className="text-center">
            <p className="text-4xl font-extrabold text-gray-900">4.9</p>
            <StarRating rating={5} />
            <p className="mt-1 text-xs text-gray-400">Average Rating</p>
          </div>
          <div className="h-12 w-px bg-gray-100 hidden sm:block" />
          <div className="text-center">
            <p className="text-4xl font-extrabold text-gray-900">50K+</p>
            <p className="text-xs text-gray-400 mt-1">Happy Patients</p>
          </div>
          <div className="h-12 w-px bg-gray-100 hidden sm:block" />
          <div className="text-center">
            <p className="text-4xl font-extrabold text-gray-900">98%</p>
            <p className="text-xs text-gray-400 mt-1">Would Recommend</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
