import { Routes, Route } from "react-router-dom";
import HomePage      from "./pages/home/index.jsx";
import LoginPage     from "./pages/auth/login/index.jsx";
import SignupPage    from "./pages/auth/signup/index.jsx";
import VerifyOTPPage from "./pages/auth/verify-otp/index.jsx";
import AboutPage     from "./pages/about/index.jsx";
import CareersPage   from "./pages/careers/index.jsx";
import PressPage     from "./pages/press/index.jsx";
import BlogPage      from "./pages/blog/index.jsx";
import LegalPage     from "./pages/legal/index.jsx";
import ContactPage   from "./pages/contact/index.jsx";

const App = () => (
  <Routes>
    {/* ── Core ──────────────────────────────────────────────────── */}
    <Route path="/"           element={<HomePage />} />
    <Route path="/login"      element={<LoginPage />} />
    <Route path="/signup"     element={<SignupPage />} />
    <Route path="/verify-otp" element={<VerifyOTPPage />} />

    {/* ── Company pages ─────────────────────────────────────────── */}
    <Route path="/about"   element={<AboutPage />} />
    <Route path="/careers" element={<CareersPage />} />
    <Route path="/press"   element={<PressPage />} />
    <Route path="/blog"    element={<BlogPage />} />
    <Route path="/contact" element={<ContactPage />} />

    {/* ── Legal (Privacy Policy + Terms of Use — tabbed) ────────── */}
    <Route path="/legal"          element={<LegalPage />} />
    <Route path="/privacy-policy" element={<LegalPage />} />
    <Route path="/terms-of-use"   element={<LegalPage />} />

    {/* ── To be added ───────────────────────────────────────────── */}
    {/* <Route path="/find-doctor"      element={<FindDoctorPage />} /> */}
    {/* <Route path="/video-consultant" element={<VideoConsultantPage />} /> */}
    {/* <Route path="/lab-tests"        element={<LabTestsPage />} /> */}
  </Routes>
);

export default App;
