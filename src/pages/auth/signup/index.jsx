import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../../api/index.js";
import { Button, Input } from "../../../components/common/index.js";

// ─── Validation ───────────────────────────────────────────────────────────────

const validate = ({ name, email, password, confirmPassword }) => {
  const errors = {};
  if (!name.trim() || name.trim().length < 2)
    errors.name = "Full name must be at least 2 characters.";
  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address.";
  if (!password || password.length < 8)
    errors.password = "Password must be at least 8 characters.";
  if (password !== confirmPassword)
    errors.confirmPassword = "Passwords do not match.";
  return errors;
};

// ─── Component ────────────────────────────────────────────────────────────────

const SignupPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "",
  });
  const [errors, setErrors]     = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError)     setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await authAPI.signup({
        name:     form.name.trim(),
        email:    form.email.trim().toLowerCase(),
        password: form.password,
      });
      navigate("/verify-otp", {
        state: { userId: res.data.userId, email: form.email.trim().toLowerCase(), type: "signup" },
      });
    } catch (err) {
      setApiError(err.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f3ee] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* ── Brand ─────────────────────────────────────────────── */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold">
              <span className="text-gray-800">Its my </span>
              <span className="text-emerald-600">Doc</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="mt-1 text-sm text-gray-500">Book doctors, consult online, track your health.</p>
        </div>

        {/* ── Card ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {/* API error */}
          {apiError && (
            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="Akansha Sharma"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              showPasswordToggle
              required
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              showPasswordToggle
              required
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              loadingText="Creating account…"
              className="mt-1 bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-700">
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          By signing up, you agree to our{" "}
          <span className="text-emerald-600 cursor-pointer hover:underline">Terms</span>{" "}
          &amp;{" "}
          <span className="text-emerald-600 cursor-pointer hover:underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
