const Config = {
  API_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  APP_NAME: import.meta.env.VITE_APP_NAME || "MediBook",
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 15000,
  IS_DEV: import.meta.env.DEV,
};

export default Config;
