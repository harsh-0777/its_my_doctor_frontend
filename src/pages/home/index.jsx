import Header      from "../../layouts/header/index.jsx";
import Footer      from "../../layouts/footer/index.jsx";
import HeroSlider  from "./components/HeroSlider/index.jsx";
import InfoTicker  from "./components/InfoTicker/index.jsx";
import Departments from "./components/Departments/index.jsx";
import LabTests    from "./components/LabTests/index.jsx";
import WhyChooseUs from "./components/WhyChooseUs/index.jsx";
import Testimonials from "./components/Testimonials/index.jsx";
import CTABanner   from "./components/CTABanner/index.jsx";

const HomePage = () => (
  <div className="min-h-screen bg-[#f7f3ee]">
    <Header />

    <main>
      {/* 1. Hero slider with auto-advancing slides */}
      <HeroSlider />

      {/* 2. Scrolling stats ticker strip */}
      <InfoTicker />

      {/* 3. Medical departments / specializations grid */}
      <Departments />

      {/* 4. Lab tests & diagnostics */}
      <LabTests />

      {/* 5. Why choose us — USPs */}
      <WhyChooseUs />

      {/* 6. Patient testimonials */}
      <Testimonials />

      {/* 7. Call-to-action banner */}
      <CTABanner />
    </main>

    <Footer />
  </div>
);

export default HomePage;
