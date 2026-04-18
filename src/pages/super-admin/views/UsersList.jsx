import { useState } from "react";

const ROLE_COLORS = {
  super_admin: "bg-violet-100 text-violet-700",
  admin:       "bg-red-100   text-red-700",
  doctor:      "bg-blue-100  text-blue-700",
  patient:     "bg-green-100 text-green-700",
};

const ROLE_FILTERS = ["all", "super_admin", "admin", "doctor", "patient"];

const UserRow = ({ user }) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
          {user.name?.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>
      </div>
    </td>
    <td className="px-4 py-3">
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${ROLE_COLORS[user.role] || "bg-gray-100 text-gray-600"}`}>
        {user.role?.replace("_", " ")}
      </span>
    </td>
    <td className="px-4 py-3">
      {user.isVerified ? (
        <span className="flex items-center gap-1 text-xs text-emerald-600">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Verified
        </span>
      ) : (
        <span className="text-xs text-gray-400">Unverified</span>
      )}
    </td>
    <td className="px-4 py-3 text-xs text-gray-400">
      {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
    </td>
  </tr>
);

// ─── Users List ───────────────────────────────────────────────────────────────
const UsersList = ({ users, total, loading, onFilterChange, activeFilter, onSearch, search }) => (
  <div className="space-y-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Users</h2>
        <p className="mt-1 text-sm text-gray-500">
          {total !== undefined ? `${total} registered user${total !== 1 ? "s" : ""}` : "All registered users"}
        </p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full sm:w-64 rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
      />
    </div>

    {/* Role filter */}
    <div className="flex flex-wrap gap-2">
      {ROLE_FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f === "all" ? "" : f)}
          className={[
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors capitalize",
            activeFilter === (f === "all" ? "" : f)
              ? "bg-violet-600 text-white"
              : "border border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:text-violet-600",
          ].join(" ")}
        >
          {f.replace("_", " ")}
        </button>
      ))}
    </div>

    {loading ? (
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-14 rounded-xl bg-gray-100 animate-pulse" />)}
      </div>
    ) : (
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {users.length === 0 ? (
          <p className="py-12 text-center text-sm text-gray-400">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400">User</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Role</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => <UserRow key={u._id} user={u} />)}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )}
  </div>
);

export default UsersList;
