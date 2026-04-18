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

export * as contactAPI from "./contact";
export * as tabAPI     from "./tab";
export * as roleAPI    from "./role";
export * as userAPI    from "./user";
