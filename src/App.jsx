import { Routes, Route } from "react-router-dom";
import HomePage       from "./pages/home/index.jsx";
import LoginPage      from "./pages/auth/login/index.jsx";
import SignupPage     from "./pages/auth/signup/index.jsx";
import VerifyOTPPage  from "./pages/auth/verify-otp/index.jsx";

const App = () => (
  <Routes>
    {/* Public */}
    <Route path="/"           element={<HomePage />} />
    <Route path="/login"      element={<LoginPage />} />
    <Route path="/signup"     element={<SignupPage />} />
    <Route path="/verify-otp" element={<VerifyOTPPage />} />

    {/* ── To be added ───────────────────────────────────────── */}
    {/* <Route path="/find-doctor"      element={<FindDoctorPage />} /> */}
    {/* <Route path="/video-consultant" element={<VideoConsultantPage />} /> */}
    {/* <Route path="/lab-tests"        element={<LabTestsPage />} /> */}
  </Routes>
);

export default App;
