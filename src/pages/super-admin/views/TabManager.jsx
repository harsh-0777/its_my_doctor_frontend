// ─── Tab Manager — assign / revoke tabs per role ─────────────────────────────
// Select a role → see every tab in the system → toggle ON/OFF for that role.
// Public tabs are locked — they're always accessible and don't need role assignment.

const GROUP_LABELS = {
  utility:     "Utility",
  main_nav:    "Main Navigation",
  company:     "Company Pages",
  dashboard:   "Dashboard",
  admin:       "Admin Panel",
  super_admin: "Super Admin",
};

const TabRow = ({ tab, roleName, isAssigned, onToggle, saving }) => {
  const isLocked = tab.isPublic;

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{tab.label}</p>
        <p className="text-xs text-gray-400 truncate">{tab.path}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {isLocked && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">public</span>
        )}
        <button
          onClick={() => !isLocked && onToggle(tab._id, !isAssigned)}
          disabled={isLocked || saving === tab._id}
          title={isLocked ? "Public tabs cannot be restricted" : isAssigned ? "Remove access" : "Grant access"}
          className={[
            "relative h-6 w-11 rounded-full transition-colors focus:outline-none",
            isLocked
              ? "bg-gray-200 cursor-not-allowed"
              : isAssigned
              ? "bg-emerald-500"
              : "bg-gray-300",
          ].join(" ")}
        >
          <span
            className={[
              "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
              isAssigned ? "translate-x-5" : "translate-x-0.5",
            ].join(" ")}
          />
          {saving === tab._id && (
            <span className="absolute inset-0 flex items-center justify-center">
              <svg className="h-3 w-3 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

const TabManager = ({ roles, allTabs, selectedRole, onRoleChange, onToggle, saving, loading }) => {
  const role = roles.find((r) => r.name === selectedRole);

  // Group tabs
  const grouped = allTabs.reduce((acc, tab) => {
    const g = tab.group || "other";
    if (!acc[g]) acc[g] = [];
    acc[g].push(tab);
    return acc;
  }, {});

  const assignedIds = new Set(
    allTabs.filter((t) => t.roles?.includes(selectedRole)).map((t) => t._id)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Tab Manager</h2>
          <p className="mt-1 text-sm text-gray-500">
            Control which pages each role can access. Toggle tabs on or off per role.
          </p>
        </div>

        {/* Role selector */}
        <div className="flex items-center gap-3">
          <label htmlFor="role-select" className="text-sm font-medium text-gray-700 shrink-0">
            Role:
          </label>
          <select
            id="role-select"
            value={selectedRole}
            onChange={(e) => onRoleChange(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          >
            {roles.map((r) => (
              <option key={r.name} value={r.name}>{r.label}</option>
            ))}
          </select>
          {role && (
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: role.color || "#6366f1" }}
            >
              {assignedIds.size} tabs assigned
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([group, tabs]) => (
            <div key={group}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                {GROUP_LABELS[group] || group}
              </h3>
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <TabRow
                    key={tab._id}
                    tab={tab}
                    roleName={selectedRole}
                    isAssigned={tab.isPublic || assignedIds.has(tab._id)}
                    onToggle={onToggle}
                    saving={saving}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TabManager;
