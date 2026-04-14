import axios from "axios";
import Config from "../config";

// ─── Token Helpers ────────────────────────────────────────────────────────────

export const getToken       = () => localStorage.getItem("token");
export const setToken       = (t) => localStorage.setItem("token", t);
export const removeToken    = () => localStorage.removeItem("token");
export const getRefreshToken = () => localStorage.getItem("refreshToken");
export const setRefreshToken = (t) => localStorage.setItem("refreshToken", t);
export const removeRefreshToken = () => localStorage.removeItem("refreshToken");

// ─── Response / Error normalizers ────────────────────────────────────────────

export const handleResponse = (response) => response.data;

export const handleError = (error) => {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again.";
  const status = error?.response?.status || 500;
  const err    = new Error(message);
  err.status   = status;
  throw err;
};

// ─── FormData builder ────────────────────────────────────────────────────────

export const processFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (Array.isArray(value)) value.forEach((item) => formData.append(key, item));
    else formData.append(key, value);
  });
  return formData;
};

// ─── Query param cleaner ─────────────────────────────────────────────────────

export const processQueryParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([, v]) => v !== null && v !== undefined && v !== ""
    )
  );

// ─── Axios instance ───────────────────────────────────────────────────────────

const API = axios.create({
  baseURL: Config.API_URL,
  timeout: Config.TIMEOUT,
  headers: { "Content-Type": "application/json" },
});

// Request — inject access token
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Refresh-token queue (prevents multiple parallel refresh calls) ────────────

let isRefreshing = false;
let pendingQueue = [];

const drainQueue = (error, token = null) => {
  pendingQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token)
  );
  pendingQueue = [];
};

// Response — silent token refresh on 401
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Skip if not 401, already retried, or it's the refresh call itself
    if (
      error.response?.status !== 401 ||
      original._retry ||
      original.url?.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue this request until refresh completes
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`;
        return API(original);
      });
    }

    original._retry = true;
    isRefreshing    = true;

    const storedRefreshToken = getRefreshToken();

    if (!storedRefreshToken) {
      removeToken();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    try {
      // Use plain axios (not the API instance) to avoid interceptor loop
      const { data } = await axios.post(
        `${Config.API_URL}/auth/refresh-token`,
        { refreshToken: storedRefreshToken }
      );

      const { accessToken: newAccess, refreshToken: newRefresh } = data.data;

      setToken(newAccess);
      setRefreshToken(newRefresh);

      drainQueue(null, newAccess);
      original.headers.Authorization = `Bearer ${newAccess}`;
      return API(original);
    } catch (refreshError) {
      drainQueue(refreshError, null);
      removeToken();
      removeRefreshToken();
      localStorage.removeItem("user");
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default API;
