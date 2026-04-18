import API, { handleResponse, handleError } from "../core";

const BASE = "/tabs";

// GET /api/v1/tabs/me — refresh my accessible tabs (used after admin changes permissions)
export const getMyTabs = () =>
  API.get(`${BASE}/me`).then(handleResponse).catch(handleError);

// GET /api/v1/tabs — admin: all tabs with optional filters
export const getAllTabs = (params = {}) =>
  API.get(BASE, { params }).then(handleResponse).catch(handleError);

// PUT /api/v1/tabs/:id — admin: update a tab
export const updateTab = (id, data) =>
  API.put(`${BASE}/${id}`, data).then(handleResponse).catch(handleError);
