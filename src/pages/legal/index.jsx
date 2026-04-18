import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../layouts/header/index.jsx";
import Footer from "../../layouts/footer/index.jsx";
import LegalBody from "./Body.jsx";
import { PRIVACY_SECTIONS, TERMS_SECTIONS, LAST_UPDATED } from "./data.js";

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
    const tab = params.get("tab");
    if (tab === "terms") setActiveTab("terms");
    else if (tab === "privacy") setActiveTab("privacy");
  }, [location.pathname, location.search]);

  const sections = activeTab === "privacy" ? PRIVACY_SECTIONS : TERMS_SECTIONS;
  const lastUpdated = LAST_UPDATED[activeTab];

  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      <Header />
      <LegalBody
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sections={sections}
        lastUpdated={lastUpdated}
      />
      <Footer />
    </div>
  );
};

export default LegalPage;
