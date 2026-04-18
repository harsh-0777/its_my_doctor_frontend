// Contact page static data — will be replaced by API calls once backend endpoints are ready.

export const CONTACT_INFO = [
  {
    icon: "phone",
    title: "Phone",
    value: "+91 80001 23456",
    sub: "Mon–Sat, 9 am–7 pm IST",
    href: "tel:+918000123456",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: "email",
    title: "Email",
    value: "support@itsmydoc.in",
    sub: "We reply within 24 hours",
    href: "mailto:support@itsmydoc.in",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: "location",
    title: "Office",
    value: "Bandra West, Mumbai",
    sub: "400050, Maharashtra, India",
    href: "#",
    color: "bg-rose-50 text-rose-600",
  },
];

export const SUBJECTS = [
  { value: "", label: "Select a subject..." },
  { value: "Appointment Issue",      label: "Appointment Issue" },
  { value: "Doctor Onboarding",      label: "Doctor Onboarding" },
  { value: "Billing / Refund",       label: "Billing / Refund" },
  { value: "Technical Problem",      label: "Technical Problem" },
  { value: "Partnership / Business", label: "Partnership / Business" },
  { value: "Press / Media",          label: "Press / Media" },
  { value: "Feedback or Suggestion", label: "Feedback or Suggestion" },
  { value: "Other",                  label: "Other" },
];

export const FAQ = [
  {
    q: "How do I cancel an appointment?",
    a: "You can cancel from your dashboard up to 2 hours before the appointment for a full refund.",
  },
  {
    q: "How do I get a refund?",
    a: "Approved refunds are returned to your original payment method within 5–7 business days.",
  },
  {
    q: "Are the doctors verified?",
    a: "Yes. Every doctor is verified against the National Medical Commission register before going live.",
  },
  {
    q: "Can I see a doctor on the same day?",
    a: "Many doctors offer same-day slots. Use the 'Today' filter when searching for a doctor.",
  },
];
