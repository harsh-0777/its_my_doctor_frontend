import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../layouts/header/index.jsx";
import Footer from "../../layouts/footer/index.jsx";

// ─── Content ──────────────────────────────────────────────────────────────────
const PRIVACY_SECTIONS = [
  {
    title: "1. Information We Collect",
    body: `We collect information you provide directly, such as when you create an account, book an appointment, or contact our support team.

**Account data:** Name, email address, phone number, date of birth, and profile photo.
**Health data:** Medical history, prescriptions, appointment notes, and lab reports that you voluntarily upload or share with a doctor via our platform.
**Usage data:** Device type, browser, IP address, pages visited, and interaction logs — collected automatically via cookies and server logs.
**Payment data:** We do not store full card numbers. Payments are processed through RBI-compliant payment gateways; we only receive a transaction reference.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use the information we collect to:

- Facilitate appointment booking and video consultations between you and doctors.
- Send you appointment confirmations, reminders, and follow-up summaries.
- Improve our platform and personalise your experience.
- Comply with applicable laws and regulations, including the Digital Personal Data Protection Act, 2023.
- Respond to your queries, complaints, and support requests.

We do not use your health data to train third-party AI models without your explicit consent.`,
  },
  {
    title: "3. Sharing of Information",
    body: `We share your information only in the following limited circumstances:

**With doctors:** When you book an appointment, the doctor receives your name, contact details, and the health information you provide for that consultation.
**With service providers:** We use trusted third parties (hosting, payment processing, email delivery) who are contractually bound to protect your data.
**For legal compliance:** If required by law, a court order, or to prevent fraud or harm.
**Business transfers:** In the event of a merger or acquisition, your data may be transferred — with prior notice to you.

We do not sell your personal data.`,
  },
  {
    title: "4. Data Retention",
    body: `We retain your account data for as long as your account is active. Health records are retained for 7 years from the date of creation, in accordance with Indian medical record regulations.

You may request deletion of your account at any time. Upon deletion, we will anonymise or delete your personal data within 30 days, except where retention is required by law.`,
  },
  {
    title: "5. Security",
    body: `We implement industry-standard security measures including:

- TLS 1.3 encryption for all data in transit.
- AES-256 encryption for health data at rest.
- Role-based access controls limiting staff access to patient data.
- Regular third-party security audits.

No system is completely secure. If we become aware of a data breach affecting you, we will notify you within 72 hours as required by law.`,
  },
  {
    title: "6. Your Rights",
    body: `Under the Digital Personal Data Protection Act, 2023, you have the right to:

- **Access** the personal data we hold about you.
- **Correct** inaccurate data.
- **Delete** your data ("right to erasure"), subject to legal retention requirements.
- **Nominate** a person to exercise your data rights in the event of death or incapacity.
- **Withdraw consent** at any time for processing based on consent.

To exercise any of these rights, contact us at privacy@itsmydoc.in.`,
  },
  {
    title: "7. Cookies",
    body: `We use cookies to:

- Keep you logged in across sessions.
- Remember your preferences.
- Analyse platform usage via anonymised analytics (e.g., page views, feature usage).

You can control cookies through your browser settings. Disabling certain cookies may affect platform functionality.`,
  },
  {
    title: "8. Contact Us",
    body: `For privacy-related questions or complaints, contact:

**ItsMyDoc Privacy Team**
Email: privacy@itsmydoc.in
Address: 404, Midas Tower, Bandra Kurla Complex, Mumbai — 400051

We will respond within 7 business days.`,
  },
];

const TERMS_SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using ItsMyDoc ("the Platform"), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Platform.

These Terms apply to all users — patients, doctors, and administrators. We may update these Terms from time to time; continued use of the Platform constitutes acceptance of the updated Terms.`,
  },
  {
    title: "2. Nature of the Platform",
    body: `ItsMyDoc is a technology platform that facilitates:

- Discovery and booking of appointments with registered medical practitioners.
- Video and text-based consultations.
- Storage and sharing of medical records at the patient's discretion.

**ItsMyDoc is not a medical provider.** We do not provide medical advice, diagnosis, or treatment. The doctors on our platform are independent practitioners responsible for their own clinical decisions.`,
  },
  {
    title: "3. User Accounts",
    body: `You must be at least 18 years of age to create an account, or have verifiable parental/guardian consent.

You are responsible for:
- Maintaining the confidentiality of your account credentials.
- All activity that occurs under your account.
- Providing accurate and up-to-date information during registration.

We reserve the right to suspend or terminate accounts that violate these Terms.`,
  },
  {
    title: "4. Doctor Profiles & Verification",
    body: `All doctors on ItsMyDoc are verified against the National Medical Register maintained by the National Medical Commission of India. However:

- Verification is a point-in-time check; we cannot guarantee continuous compliance.
- Patient reviews and ratings reflect individual experiences and are not editorial endorsements.
- Consultation fees are set by the doctor and may vary.

If you believe a doctor's credentials are inaccurate, report this to trust@itsmydoc.in immediately.`,
  },
  {
    title: "5. Appointments & Cancellations",
    body: `**Booking:** Appointments are confirmed subject to doctor availability. You will receive an email and SMS confirmation.
**Rescheduling:** You may reschedule up to 2 hours before the appointment start time at no charge.
**Cancellations:** Cancellations made more than 2 hours before the appointment are fully refunded. Late cancellations may incur a cancellation fee up to ₹150.
**No-shows:** Missed appointments without notice are non-refundable.
**Doctor cancellations:** If a doctor cancels, you will receive a full refund and the option to rebook at no extra charge.`,
  },
  {
    title: "6. Payments & Refunds",
    body: `All transactions are processed through RBI-regulated payment gateways. ItsMyDoc does not store payment card details.

Refunds, where applicable, are processed to the original payment method within 5–7 business days.

For payment disputes, contact billing@itsmydoc.in with your booking reference.`,
  },
  {
    title: "7. Prohibited Conduct",
    body: `You agree not to:

- Impersonate any person or entity.
- Provide false health information that may affect clinical decisions.
- Attempt to access any other user's account or health records.
- Use the platform to solicit patients outside of ItsMyDoc.
- Engage in any conduct that disrupts or harms the Platform or other users.

Violation of these prohibitions may result in immediate account termination and legal action.`,
  },
  {
    title: "8. Limitation of Liability",
    body: `To the maximum extent permitted by applicable law, ItsMyDoc is not liable for:

- Clinical outcomes or medical decisions made by doctors on the Platform.
- Indirect, incidental, or consequential damages arising from use of the Platform.
- Service interruptions outside our reasonable control (e.g., internet outages, natural disasters).

Our total liability for any claim arising out of your use of the Platform shall not exceed the amount you paid to ItsMyDoc in the 3 months preceding the claim.`,
  },
  {
    title: "9. Governing Law",
    body: `These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.

For consumer disputes, you may also approach the Consumer Disputes Redressal Commission under the Consumer Protection Act, 2019.`,
  },
  {
    title: "10. Contact",
    body: `For questions about these Terms, contact:

**ItsMyDoc Legal Team**
Email: legal@itsmydoc.in
Address: 404, Midas Tower, Bandra Kurla Complex, Mumbai — 400051`,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const Section = ({ title, body }) => (
  <div className="mb-8">
    <h3 className="text-base font-semibold text-gray-900 mb-3">{title}</h3>
    <div className="text-sm text-gray-600 leading-relaxed space-y-3">
      {body.split("\n\n").map((para, i) => {
        // Render **bold** text
        const formatted = para.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) =>
          chunk.startsWith("**") && chunk.endsWith("**")
            ? <strong key={j} className="text-gray-800">{chunk.slice(2, -2)}</strong>
            : chunk
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

// ─── Page ─────────────────────────────────────────────────────────────────────
const LegalPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("privacy");

  // Allow deep-linking: /legal?tab=terms  OR  /privacy-policy  OR  /terms-of-use
  useEffect(() => {
    if (location.pathname === "/terms-of-use") {
      setActiveTab("terms");
      return;
    }
    if (location.pathname === "/privacy-policy") {
      setActiveTab("privacy");
      return;
    }
    const params = new URLSearchParams(location.search);
    const tab    = params.get("tab");
    if (tab === "terms") setActiveTab("terms");
    else if (tab === "privacy") setActiveTab("privacy");
  }, [location.pathname, location.search]);

  const sections  = activeTab === "privacy" ? PRIVACY_SECTIONS : TERMS_SECTIONS;
  const lastUpdated = activeTab === "privacy" ? "1 April 2024" : "1 April 2024";

  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      <Header />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16 px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Legal &amp; Privacy
          </h1>
          <p className="mt-3 text-gray-500">
            We believe legal documents should be readable by humans, not just lawyers.
          </p>
        </section>

        {/* ── Tab switcher ───────────────────────────────────────────────── */}
        <div className="sticky top-16 z-40 bg-white border-b border-gray-200 px-4">
          <div className="mx-auto max-w-3xl flex">
            {[
              { id: "privacy", label: "Privacy Policy" },
              { id: "terms",   label: "Terms of Use"   },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
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

        {/* ── Content ────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-4 py-12">
          <p className="mb-8 text-xs text-gray-400">Last updated: {lastUpdated}</p>
          {sections.map((s) => <Section key={s.title} {...s} />)}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;
