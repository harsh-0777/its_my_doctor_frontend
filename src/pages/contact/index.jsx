import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../layouts/header/index.jsx";
import Footer from "../../layouts/footer/index.jsx";
import { contactAPI } from "../../api/index.js";
import ContactBody from "./Body.jsx";
import { CONTACT_INFO, SUBJECTS, FAQ } from "./data.js";

const ContactPage = () => {
  const [submitted, setSubmitted]     = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      await contactAPI.submitContact(data);
      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError(err.message || "Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setServerError("");
  };

  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      <Header />
      <ContactBody
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        submitted={submitted}
        serverError={serverError}
        onReset={handleReset}
        contactInfo={CONTACT_INFO}
        subjects={SUBJECTS}
        faq={FAQ}
      />
      <Footer />
    </div>
  );
};

export default ContactPage;
