import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f3ee] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50 border border-blue-100">
          <span className="text-4xl font-bold text-blue-500">404</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Go Back
          </button>
          <Link
            to="/"
            className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
