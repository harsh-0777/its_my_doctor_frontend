import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectCurrentUser,
} from "../../store/slice/authSlice.js";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  return (
    <div className="min-h-screen bg-[#f7f3ee] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Status code */}
        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-red-50 border border-red-100">
          <span className="text-4xl font-bold text-red-500">403</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
          {isAuthenticated
            ? `Your account (${user?.role || "user"}) doesn't have permission to view this page.`
            : "You need to be logged in to view this page."}
        </p>

        {/* Role badge */}
        {isAuthenticated && user?.role && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Logged in as{" "}
            <span className="font-semibold capitalize">{user.role}</span>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Go Back
          </button>
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
            >
              Sign In
            </Link>
          )}
          <Link
            to="/"
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
