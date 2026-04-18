import API, { handleResponse, handleError } from "../core";

const BASE = "/roles";

// GET /api/v1/roles — all roles with tab counts
export const getAllRoles = () =>
  API.get(BASE).then(handleResponse).catch(handleError);

// POST /api/v1/roles — create a custom role
export const createRole = (data) =>
  API.post(BASE, data).then(handleResponse).catch(handleError);

// PUT /api/v1/roles/:id — update role label / color / name
export const updateRole = (id, data) =>
  API.put(`${BASE}/${id}`, data).then(handleResponse).catch(handleError);

// DELETE /api/v1/roles/:id — delete a custom role
export const deleteRole = (id) =>
  API.delete(`${BASE}/${id}`).then(handleResponse).catch(handleError);

// PUT /api/v1/roles/:roleName/tabs/:tabId — assign or revoke a tab for a role
// assign: true → add role to tab.roles[], false → remove
export const toggleTabForRole = (roleName, tabId, assign) =>
  API.put(`${BASE}/${roleName}/tabs/${tabId}`, { assign })
    .then(handleResponse)
    .catch(handleError);
