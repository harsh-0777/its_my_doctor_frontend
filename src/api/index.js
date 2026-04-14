// ─── Core utilities ───────────────────────────────────────────────────────────
export {
  default as API,
  getToken,
  setToken,
  removeToken,
  handleResponse,
  handleError,
  processFormData,
  processQueryParams,
} from "./core";

// ─── Auth ─────────────────────────────────────────────────────────────────────
export * as authAPI from "./auth";

// ─── Domain APIs ──────────────────────────────────────────────────────────────
export * as doctorAPI from "./doctor";
export * as appointmentAPI from "./appointment";
export * as patientAPI from "./patient";

// ─── Add new domains below as the app grows ───────────────────────────────────
// export * as pharmacyAPI from "./pharmacy";
// export * as reportAPI   from "./report";
