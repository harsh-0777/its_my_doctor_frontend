import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAPI } from "../../../api/index.js";
import { setCredentials } from "../../../store/slice/authSlice.js";
import { Button } from "../../../components/common/index.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const RESEND_SECONDS = 120;

const maskEmail = (email = "") => {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(0, 2);
  return `${visible}${"*".repeat(Math.max(local.length - 2, 2))}@${domain}`;
};

const formatTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

// ─── OTP Input ────────────────────────────────────────────────────────────────

const OTPInput = ({ otp, setOtp, disabled }) => {
  const refs = useRef([]);

  const focusAt = (i) => refs.current[i]?.focus();

  const handleChange = (e, i) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) focusAt(i + 1);
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace") {
      if (otp[i]) {
        const next = [...otp];
        next[i] = "";
        setOtp(next);
      } else if (i > 0) {
        focusAt(i - 1);
      }
    }
    if (e.key === "ArrowLeft" && i > 0) focusAt(i - 1);
    if (e.key === "ArrowRight" && i < 5) focusAt(i + 1);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    focusAt(Math.min(pasted.length, 5));
  };

  return (
    <div className="flex items-center justify-center gap-3" onPaste={handlePaste}>
      {otp.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onFocus={(e) => e.target.select()}
          className={[
            "h-13 w-11 rounded-xl border-2 text-center text-xl font-bold",
            "transition-all duration-150 outline-none",
            "disabled:bg-gray-50 disabled:cursor-not-allowed",
            digit
              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
              : "border-gray-200 bg-white text-gray-900 focus:border-blue-500 focus:bg-blue-50",
          ].join(" ")}
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const VerifyOTPPage = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const dispatch  = useDispatch();

  const { userId, email, type } = location.state || {};

  const [otp, setOtp]           = useState(["", "", "", "", "", ""]);
  const [timer, setTimer]       = useState(RESEND_SECONDS);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess]   = useState("");

  // Guard — if accessed without state, redirect
  useEffect(() => {
    if (!userId || !email) navigate("/login", { replace: true });
  }, [userId, email, navigate]);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const otpString = otp.join("");
  const isFilled  = otpString.length === 6;

  const handleVerify = useCallback(async () => {
    if (!isFilled || isVerifying) return;
    setApiError("");
    setIsVerifying(true);

    try {
      const res = await authAPI.verifyOTP({ userId, otp: otpString });
      const { accessToken, refreshToken, user } = res.data;

      dispatch(setCredentials({ accessToken, refreshToken, user }));
      setSuccess("Verified! Redirecting…");

      setTimeout(() => navigate("/", { replace: true }), 1000);
    } catch (err) {
      setApiError(err.message || "Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
    } finally {
      setIsVerifying(false);
    }
  }, [isFilled, isVerifying, userId, otpString, dispatch, navigate]);

  // Auto-submit when all 6 digits filled
  useEffect(() => {
    if (isFilled) handleVerify();
  }, [isFilled]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleResend = async () => {
    setIsResending(true);
    setApiError("");
    try {
      await authAPI.resendOTP({ userId, email });
      setTimer(RESEND_SECONDS);
      setOtp(["", "", "", "", "", ""]);
      setSuccess("New OTP sent to your email.");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setApiError(err.message || "Failed to resend OTP.");
    } finally {
      setIsResending(false);
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
          <h1 className="text-2xl font-bold text-gray-900">Verify your email</h1>
          <p className="mt-1 text-sm text-gray-500">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-gray-700">{maskEmail(email)}</span>
          </p>
        </div>

        {/* ── Card ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {/* Success */}
          {success && (
            <div className="mb-5 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700 text-center">
              {success}
            </div>
          )}

          {/* Error */}
          {apiError && (
            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 text-center">
              {apiError}
            </div>
          )}

          {/* OTP boxes */}
          <div className="mb-8">
            <OTPInput otp={otp} setOtp={setOtp} disabled={isVerifying || !!success} />
          </div>

          {/* Verify button */}
          <Button
            type="button"
            fullWidth
            isLoading={isVerifying}
            loadingText="Verifying…"
            disabled={!isFilled}
            onClick={handleVerify}
            className="bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500
                       disabled:opacity-40"
          >
            Verify OTP
          </Button>

          {/* Timer + Resend */}
          <div className="mt-6 text-center">
            {timer > 0 ? (
              <p className="text-sm text-gray-500">
                Resend OTP in{" "}
                <span className="font-medium text-gray-700 tabular-nums">
                  {formatTime(timer)}
                </span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? "Sending…" : "Resend OTP"}
              </button>
            )}
          </div>

          {/* Back link */}
          <div className="mt-4 text-center">
            <Link
              to={type === "signup" ? "/signup" : "/login"}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              ← Back to {type === "signup" ? "sign up" : "login"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPPage;
