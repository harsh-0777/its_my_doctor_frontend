import { Link } from "react-router-dom";
import Overview    from "./views/Overview.jsx";
import TabManager  from "./views/TabManager.jsx";
import RoleManager from "./views/RoleManager.jsx";
import UsersList   from "./views/UsersList.jsx";

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV = [
  {
    id:    "overview",
    label: "Overview",
    icon:  (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    id:    "tabs",
    label: "Tab Manager",
    icon:  (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
  {
    id:    "roles",
    label: "Role Manager",
    icon:  (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
  },
  {
    id:    "users",
    label: "Users",
    icon:  (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
  },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ activeView, onNavChange, userName }) => (
  <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
    {/* Brand */}
    <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600">
        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">Super Admin</p>
        <p className="text-xs text-gray-400 truncate max-w-[130px]">{userName}</p>
      </div>
    </div>

    {/* Nav */}
    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
      {NAV.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => onNavChange(id)}
          className={[
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-left",
            activeView === id
              ? "bg-violet-50 text-violet-700"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
          ].join(" ")}
        >
          <span className={activeView === id ? "text-violet-600" : "text-gray-400"}>
            {icon}
          </span>
          {label}
        </button>
      ))}
    </nav>

    {/* Footer */}
    <div className="border-t border-gray-100 px-3 py-4 space-y-1">
      <Link
        to="/dashboard"
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
      >
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
        Back to Dashboard
      </Link>
    </div>
  </aside>
);

// ─── Body ─────────────────────────────────────────────────────────────────────
const SuperAdminBody = ({
  activeView,
  onNavChange,
  userName,
  // overview props
  stats,
  statsLoading,
  // tab manager props
  roles,
  allTabs,
  selectedRole,
  onRoleChange,
  onToggleTab,
  tabSaving,
  tabsLoading,
  // role manager props
  onCreateRole,
  onDeleteRole,
  roleCreating,
  roleDeleting,
  rolesLoading,
  // users list props
  users,
  usersTotal,
  usersLoading,
  userFilter,
  onUserFilter,
  userSearch,
  onUserSearch,
}) => (
  <div className="flex h-screen overflow-hidden bg-gray-50">
    <Sidebar activeView={activeView} onNavChange={onNavChange} userName={userName} />

    {/* Main content */}
    <main className="flex-1 overflow-y-auto px-8 py-8">
      {activeView === "overview" && (
        <Overview stats={stats} loading={statsLoading} />
      )}
      {activeView === "tabs" && (
        <TabManager
          roles={roles}
          allTabs={allTabs}
          selectedRole={selectedRole}
          onRoleChange={onRoleChange}
          onToggle={onToggleTab}
          saving={tabSaving}
          loading={tabsLoading}
        />
      )}
      {activeView === "roles" && (
        <RoleManager
          roles={roles}
          onCreateRole={onCreateRole}
          onDeleteRole={onDeleteRole}
          creating={roleCreating}
          deleting={roleDeleting}
          loading={rolesLoading}
        />
      )}
      {activeView === "users" && (
        <UsersList
          users={users}
          total={usersTotal}
          loading={usersLoading}
          activeFilter={userFilter}
          onFilterChange={onUserFilter}
          search={userSearch}
          onSearch={onUserSearch}
        />
      )}
    </main>
  </div>
);

export default SuperAdminBody;
