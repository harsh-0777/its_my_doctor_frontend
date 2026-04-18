import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { roleAPI, tabAPI, userAPI } from "../../api/index.js";
import SuperAdminBody from "./Body.jsx";

// ─── Super Admin Dashboard ────────────────────────────────────────────────────
// Container — owns all state, data fetching, and event handlers.
// Passes everything as props to SuperAdminBody (pure presenter).

const SuperAdminPage = () => {
  const user = useSelector((s) => s.auth.user);

  // ── Navigation ──────────────────────────────────────────────────────────────
  const [activeView, setActiveView] = useState("overview");

  // ── Roles ────────────────────────────────────────────────────────────────────
  const [roles, setRoles]           = useState([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [roleCreating, setRoleCreating] = useState(false);
  const [roleDeleting, setRoleDeleting] = useState(null); // holds id being deleted

  // ── Tabs ─────────────────────────────────────────────────────────────────────
  const [allTabs, setAllTabs]       = useState([]);
  const [tabsLoading, setTabsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("admin");
  const [tabSaving, setTabSaving]   = useState(null); // holds tabId being saved

  // ── Users ─────────────────────────────────────────────────────────────────────
  const [users, setUsers]           = useState([]);
  const [usersTotal, setUsersTotal] = useState(0);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userFilter, setUserFilter] = useState("");
  const [userSearch, setUserSearch] = useState("");

  // ── Overview stats (derived from already-fetched data) ─────────────────────
  const [stats, setStats]           = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // ─── Data fetching ───────────────────────────────────────────────────────────

  const fetchRoles = useCallback(async () => {
    setRolesLoading(true);
    try {
      const data = await roleAPI.getAllRoles();
      setRoles(data);
      // Set default selected role to first non-super_admin role
      if (data.length && !data.find((r) => r.name === selectedRole)) {
        setSelectedRole(data[0].name);
      }
    } finally {
      setRolesLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchAllTabs = useCallback(async () => {
    setTabsLoading(true);
    try {
      const data = await tabAPI.getAllTabs();
      setAllTabs(data);
    } finally {
      setTabsLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    try {
      const params = {};
      if (userFilter) params.role       = userFilter;
      if (userSearch) params.search     = userSearch;
      const res = await userAPI.getAllUsers(params);
      setUsers(res.users || []);
      setUsersTotal(res.total || 0);
    } finally {
      setUsersLoading(false);
    }
  }, [userFilter, userSearch]);

  const buildStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const [rolesData, tabsData, usersData] = await Promise.all([
        roleAPI.getAllRoles(),
        tabAPI.getAllTabs(),
        userAPI.getAllUsers({ limit: 1000 }),
      ]);

      const roleBreakdown = rolesData
        .filter((r) => r.isSystem)
        .map((r) => ({
          role:  r.name,
          count: (usersData.users || []).filter((u) => u.role === r.name).length,
          color: r.color,
        }));

      setStats({
        totalRoles:   rolesData.length,
        customRoles:  rolesData.filter((r) => !r.isSystem).length,
        totalTabs:    tabsData.length,
        activeTabs:   tabsData.filter((t) => t.isActive).length,
        totalUsers:   usersData.total || 0,
        totalContacts: null, // fetched separately if needed
        newContacts:   null,
        roleBreakdown,
      });
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Initial load per view
  useEffect(() => {
    if (activeView === "overview") buildStats();
    if (activeView === "tabs")     { fetchRoles(); fetchAllTabs(); }
    if (activeView === "roles")    fetchRoles();
    if (activeView === "users")    fetchUsers();
  }, [activeView]); // eslint-disable-line react-hooks/exhaustive-deps

  // Refetch users when filter/search changes
  useEffect(() => {
    if (activeView === "users") fetchUsers();
  }, [userFilter, userSearch, activeView]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Handlers ────────────────────────────────────────────────────────────────

  const handleToggleTab = async (tabId, assign) => {
    setTabSaving(tabId);
    try {
      const updated = await roleAPI.toggleTabForRole(selectedRole, tabId, assign);
      // Optimistically update the tab in local state
      setAllTabs((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t))
      );
    } finally {
      setTabSaving(null);
    }
  };

  const handleCreateRole = async (formData) => {
    setRoleCreating(true);
    try {
      const newRole = await roleAPI.createRole(formData);
      setRoles((prev) => [...prev, { ...newRole, tabCount: 0 }]);
    } finally {
      setRoleCreating(false);
    }
  };

  const handleDeleteRole = async (id) => {
    setRoleDeleting(id);
    try {
      await roleAPI.deleteRole(id);
      setRoles((prev) => prev.filter((r) => r._id !== id));
    } finally {
      setRoleDeleting(null);
    }
  };

  return (
    <SuperAdminBody
      activeView={activeView}
      onNavChange={setActiveView}
      userName={user?.email || "Super Admin"}
      // overview
      stats={stats}
      statsLoading={statsLoading}
      // tab manager
      roles={roles}
      allTabs={allTabs}
      selectedRole={selectedRole}
      onRoleChange={setSelectedRole}
      onToggleTab={handleToggleTab}
      tabSaving={tabSaving}
      tabsLoading={tabsLoading}
      // role manager
      onCreateRole={handleCreateRole}
      onDeleteRole={handleDeleteRole}
      roleCreating={roleCreating}
      roleDeleting={roleDeleting}
      rolesLoading={rolesLoading}
      // users
      users={users}
      usersTotal={usersTotal}
      usersLoading={usersLoading}
      userFilter={userFilter}
      onUserFilter={setUserFilter}
      userSearch={userSearch}
      onUserSearch={setUserSearch}
    />
  );
};

export default SuperAdminPage;
