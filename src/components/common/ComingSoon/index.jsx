import { Link, useNavigate } from "react-router-dom";
import { useTabs } from "../../../hooks/useTabs.js";

/**
 * ComingSoon — placeholder rendered for protected pages that are defined
 * in the PermissibleTab registry but not yet implemented in the frontend.
 *
 * Props:
 *   tabKey  (string) — the tab's key (e.g. "my_appointments")
 *   group   (string) — "dashboard" | "admin" (controls the back-link)
 */
const ComingSoon = ({ tabKey, group = "dashboard" }) => {
  const navigate  = useNavigate();
  const { getTab } = useTabs();
  const tab         = getTab(tabKey);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 border border-emerald-100">
        <svg className="h-9 w-9 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-gray-900">
        {tab?.tabName || "Coming Soon"}
      </h2>
      {tab?.label && (
        <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-emerald-600">
          {tab.label}
        </p>
      )}
      <p className="mt-3 max-w-xs text-sm text-gray-500 leading-relaxed">
        This feature is under construction. We'll have it ready shortly.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          ← Go Back
        </button>
        <Link
          to="/dashboard"
          className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
