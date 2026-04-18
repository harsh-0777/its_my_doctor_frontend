// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, colorClass, icon }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex items-start gap-4">
    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colorClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</p>
      <p className="mt-1 text-3xl font-bold text-gray-900">{value ?? "—"}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-500">{sub}</p>}
    </div>
  </div>
);

// ─── Overview ─────────────────────────────────────────────────────────────────
const Overview = ({ stats, loading }) => {
  const cards = [
    {
      label:      "Total Users",
      value:      stats?.totalUsers,
      sub:        "across all roles",
      colorClass: "bg-blue-50 text-blue-600",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
        </svg>
      ),
    },
    {
      label:      "System Roles",
      value:      stats?.totalRoles,
      sub:        `${stats?.customRoles ?? 0} custom roles`,
      colorClass: "bg-violet-50 text-violet-600",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    },
    {
      label:      "Active Tabs",
      value:      stats?.activeTabs,
      sub:        `${stats?.totalTabs ?? 0} total`,
      colorClass: "bg-emerald-50 text-emerald-600",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      ),
    },
    {
      label:      "Contact Messages",
      value:      stats?.totalContacts,
      sub:        `${stats?.newContacts ?? 0} unread`,
      colorClass: "bg-rose-50 text-rose-600",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-2xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Platform Overview</h2>
        <p className="mt-1 text-sm text-gray-500">Live snapshot of the ItsMyDoc platform.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => <StatCard key={c.label} {...c} />)}
      </div>

      {/* Role breakdown */}
      {stats?.roleBreakdown?.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Users by Role</h3>
          <div className="flex flex-col gap-3">
            {stats.roleBreakdown.map(({ role, count, color }) => (
              <div key={role} className="flex items-center gap-3">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${Math.max(4, (count / stats.totalUsers) * 100)}%`, backgroundColor: color || "#6366f1" }}
                />
                <span className="text-sm text-gray-600 capitalize">{role.replace("_", " ")}</span>
                <span className="ml-auto text-sm font-semibold text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Actions</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Manage Roles", desc: "Create, edit, or delete roles", action: "roles" },
            { label: "Assign Tabs",  desc: "Control which pages each role can access", action: "tabs" },
            { label: "View Users",   desc: "See all registered users", action: "users" },
          ].map(({ label, desc }) => (
            <div key={label} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-900">{label}</p>
              <p className="mt-1 text-xs text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
