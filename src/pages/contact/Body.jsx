import { Link } from "react-router-dom";

// ─── Icons ────────────────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ICON_MAP = { phone: <PhoneIcon />, email: <EmailIcon />, location: <LocationIcon /> };

// ─── Small presentational pieces ─────────────────────────────────────────────
const FieldError = ({ message }) =>
  message ? (
    <p role="alert" className="mt-1 text-xs text-red-600 flex items-center gap-1">
      <svg className="h-3 w-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {message}
    </p>
  ) : null;

const SuccessBanner = ({ onReset }) => (
  <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-8 py-12 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Message received!</h3>
      <p className="mt-1 text-sm text-gray-600">
        We'll get back to you at your email within 24 hours.
      </p>
    </div>
    <button onClick={onReset} className="text-sm font-medium text-emerald-600 hover:underline">
      Send another message
    </button>
  </div>
);

// ─── Contact form (presenter — all state lives in index.jsx) ──────────────────
const ContactForm = ({ register, handleSubmit, errors, isSubmitting, onSubmit, submitted, serverError, onReset, subjects }) => {
  if (submitted) return <SuccessBanner onReset={onReset} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Name + Email row */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Riya Sharma"
            autoComplete="name"
            className={[
              "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition",
              "focus:ring-2 focus:ring-emerald-100",
              errors.name
                ? "border-red-400 focus:border-red-400"
                : "border-gray-200 focus:border-emerald-400",
            ].join(" ")}
            {...register("name", {
              required: "Name is required.",
              minLength: { value: 2, message: "Name must be at least 2 characters." },
              maxLength: { value: 100, message: "Name must not exceed 100 characters." },
            })}
          />
          <FieldError message={errors.name?.message} />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="riya@example.com"
            autoComplete="email"
            className={[
              "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition",
              "focus:ring-2 focus:ring-emerald-100",
              errors.email
                ? "border-red-400 focus:border-red-400"
                : "border-gray-200 focus:border-emerald-400",
            ].join(" ")}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          className={[
            "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition bg-white",
            "focus:ring-2 focus:ring-emerald-100",
            errors.subject
              ? "border-red-400 focus:border-red-400 text-gray-700"
              : "border-gray-200 focus:border-emerald-400 text-gray-700",
          ].join(" ")}
          {...register("subject", { required: "Please select a subject." })}
        >
          {subjects.map(({ value, label }) => (
            <option key={value} value={value} disabled={value === ""}>
              {label}
            </option>
          ))}
        </select>
        <FieldError message={errors.subject?.message} />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Describe your issue or question in as much detail as possible…"
          className={[
            "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition resize-y",
            "focus:ring-2 focus:ring-emerald-100",
            errors.message
              ? "border-red-400 focus:border-red-400"
              : "border-gray-200 focus:border-emerald-400",
          ].join(" ")}
          {...register("message", {
            required: "Message is required.",
            minLength: { value: 20, message: "Please write at least 20 characters." },
            maxLength: { value: 2000, message: "Message must not exceed 2000 characters." },
          })}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {/* Server error */}
      {serverError && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={[
          "flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition",
          isSubmitting
            ? "bg-emerald-400 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-sm",
        ].join(" ")}
      >
        {isSubmitting ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
};

// ─── Body ─────────────────────────────────────────────────────────────────────
const ContactBody = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
  submitted,
  serverError,
  onReset,
  contactInfo,
  subjects,
  faq,
}) => (
  <main>
    {/* ── Hero ─────────────────────────────────────────────────────── */}
    <section className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 py-20 px-4 text-center">
      <span className="inline-block rounded-full bg-teal-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-teal-700">
        Contact Us
      </span>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        We'd love to hear from you
      </h1>
      <p className="mt-4 mx-auto max-w-xl text-lg text-gray-600">
        Have a question, feedback, or just want to say hello? Our support team
        is here to help — every day of the week.
      </p>
    </section>

    {/* ── Contact info cards ──────────────────────────────────────── */}
    <section className="py-12 px-4">
      <div className="mx-auto max-w-4xl grid gap-4 sm:grid-cols-3">
        {contactInfo.map(({ icon, title, value, sub, href, color }) => (
          <a
            key={title}
            href={href}
            className="group flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
              {ICON_MAP[icon]}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{title}</p>
              <p className="mt-0.5 font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                {value}
              </p>
              <p className="text-xs text-gray-500">{sub}</p>
            </div>
          </a>
        ))}
      </div>
    </section>

    {/* ── Form + FAQ ──────────────────────────────────────────────── */}
    <section className="pb-20 px-4">
      <div className="mx-auto max-w-4xl grid gap-10 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Send us a message</h2>
            <p className="text-sm text-gray-500 mb-6">We respond within 24 hours on business days.</p>
            <ContactForm
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              isSubmitting={isSubmitting}
              onSubmit={onSubmit}
              submitted={submitted}
              serverError={serverError}
              onReset={onReset}
              subjects={subjects}
            />
          </div>
        </div>

        {/* FAQ */}
        <div className="lg:col-span-2">
          <h3 className="font-semibold text-gray-900 mb-4">Frequently Asked</h3>
          <div className="flex flex-col gap-4">
            {faq.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-900">{q}</p>
                <p className="mt-1 text-sm text-gray-500">{a}</p>
              </div>
            ))}
            <p className="text-sm text-gray-500 mt-2">
              More questions?{" "}
              <Link to="/blog" className="text-emerald-600 font-medium hover:underline">
                Visit our blog
              </Link>{" "}
              or check our{" "}
              <Link to="/legal?tab=privacy" className="text-emerald-600 font-medium hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default ContactBody;
