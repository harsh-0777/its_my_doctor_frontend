import Header from "../../layouts/header/index.jsx";
import Footer from "../../layouts/footer/index.jsx";
import AboutBody from "./Body.jsx";
import { STATS, TIMELINE, TEAM, VALUES } from "./data.js";

const AboutPage = () => (
  <div className="min-h-screen bg-[#f7f3ee]">
    <Header />
    <AboutBody
      stats={STATS}
      timeline={TIMELINE}
      team={TEAM}
      values={VALUES}
    />
    <Footer />
  </div>
);

export default AboutPage;
