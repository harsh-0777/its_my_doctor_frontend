import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../../api/index.js";
import { Button, Input } from "../../../components/common/index.js";

// ─── Validation ───────────────────────────────────────────────────────────────

const validate = ({ email, password }) => {
  const errors = {};
  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address.";
  if (!password)
    errors.password = "Password is required.";
  return errors;
};

// ─── Component ────────────────────────────────────────────────────────────────

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
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
      const res = await authAPI.login({
        email:    form.email.trim().toLowerCase(),
        password: form.password,
      });
      navigate("/verify-otp", {
        state: {
          userId: res.data.userId,
          email:  form.email.trim().toLowerCase(),
          type:   "login",
        },
      });
    } catch (err) {
      setApiError(err.message || "Login failed. Please check your credentials.");
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
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-500">Enter your credentials — we'll send you a secure OTP.</p>
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
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <div>
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                showPasswordToggle
                required
              />
              <div className="mt-1.5 text-right">
                <span className="text-xs text-emerald-600 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              loadingText="Sending OTP…"
              className="mt-1 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            >
              Continue with OTP
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-medium text-emerald-600 hover:text-emerald-700">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
