import { useState } from "react";
import Header from "../../layouts/header/index.jsx";
import Footer from "../../layouts/footer/index.jsx";
import CareersBody from "./Body.jsx";
import { PERKS, OPENINGS, HIRING_STEPS } from "./data.js";

const DEPTS = ["All", ...new Set(OPENINGS.map((o) => o.dept))];

const CareersPage = () => {
  const [activeDept, setActiveDept] = useState("All");

  const filtered =
    activeDept === "All" ? OPENINGS : OPENINGS.filter((o) => o.dept === activeDept);

  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      <Header />
      <CareersBody
        perks={PERKS}
        openings={OPENINGS}
        depts={DEPTS}
        activeDept={activeDept}
        onDeptChange={setActiveDept}
        filtered={filtered}
        hiringSteps={HIRING_STEPS}
      />
      <Footer />
    </div>
  );
};

export default CareersPage;
