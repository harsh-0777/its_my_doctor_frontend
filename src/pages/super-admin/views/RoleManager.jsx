import { useState } from "react";

// ─── Role card ────────────────────────────────────────────────────────────────
const RoleCard = ({ role, onDelete, deleting }) => (
  <div className="flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="flex items-start gap-4 min-w-0">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
        style={{ backgroundColor: role.color || "#6366f1" }}
      >
        {role.label.slice(0, 2).toUpperCase()}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-gray-900">{role.label}</p>
          {role.isSystem && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 font-medium">
              system
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 font-mono mt-0.5">{role.name}</p>
        <p className="mt-1 text-xs text-gray-500">
          {role.tabCount ?? 0} tab{role.tabCount !== 1 ? "s" : ""} assigned
        </p>
      </div>
    </div>

    {!role.isSystem && (
      <button
        onClick={() => onDelete(role._id)}
        disabled={deleting === role._id}
        className="shrink-0 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
      >
        {deleting === role._id ? "Deleting…" : "Delete"}
      </button>
    )}
  </div>
);

// ─── Create role form ─────────────────────────────────────────────────────────
const CreateRoleForm = ({ onCreate, creating }) => {
  const [form, setForm] = useState({ name: "", label: "", color: "#6366f1" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.label.trim()) {
      setError("Both name and label are required.");
      return;
    }
    try {
      await onCreate(form);
      setForm({ name: "", label: "", color: "#6366f1" });
    } catch (err) {
      setError(err.message || "Failed to create role.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-dashed border-violet-300 bg-violet-50 p-5">
      <h3 className="text-sm font-semibold text-violet-800 mb-4">Create New Role</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
            <span className="ml-1 text-gray-400 font-normal">(slug, e.g. nurse)</span>
          </label>
          <input
            type="text"
            placeholder="nurse"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Label <span className="text-red-500">*</span>
            <span className="ml-1 text-gray-400 font-normal">(display name)</span>
          </label>
          <input
            type="text"
            placeholder="Nurse"
            value={form.label}
            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={form.color}
              onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
              className="h-9 w-12 cursor-pointer rounded-lg border border-gray-200 p-1"
            />
            <input
              type="text"
              value={form.color}
              onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm font-mono outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />
          </div>
        </div>
      </div>

      {error && <p className="mt-3 text-xs text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={creating}
        className="mt-4 flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition-colors disabled:opacity-60"
      >
        {creating ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Creating…
          </>
        ) : (
          "Create Role"
        )}
      </button>
    </form>
  );
};

// ─── Role Manager ─────────────────────────────────────────────────────────────
const RoleManager = ({ roles, onCreateRole, onDeleteRole, creating, deleting, loading }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-bold text-gray-900">Role Manager</h2>
      <p className="mt-1 text-sm text-gray-500">
        System roles are built-in and cannot be deleted. Custom roles can be created and removed freely.
      </p>
    </div>

    <CreateRoleForm onCreate={onCreateRole} creating={creating} />

    {loading ? (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => <div key={i} className="h-20 rounded-2xl bg-gray-100 animate-pulse" />)}
      </div>
    ) : (
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          {roles.length} role{roles.length !== 1 ? "s" : ""}
        </p>
        {roles.map((role) => (
          <RoleCard
            key={role._id}
            role={role}
            onDelete={onDeleteRole}
            deleting={deleting}
          />
        ))}
      </div>
    )}
  </div>
);

export default RoleManager;
