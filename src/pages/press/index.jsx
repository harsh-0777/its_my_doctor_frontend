import Header from "../../layouts/header/index.jsx";
import Footer from "../../layouts/footer/index.jsx";
import PressBody from "./Body.jsx";
import { COVERAGE, AWARDS, STATS } from "./data.js";

const PressPage = () => (
  <div className="min-h-screen bg-[#f7f3ee]">
    <Header />
    <PressBody
      coverage={COVERAGE}
      awards={AWARDS}
      stats={STATS}
    />
    <Footer />
  </div>
);

export default PressPage;
