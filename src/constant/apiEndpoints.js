export const AUTH = {
  LOGIN:         "/auth/login",
  SIGNUP:        "/auth/signup",
  LOGOUT:        "/auth/logout",
  VERIFY_OTP:    "/auth/verify-otp",
  RESEND_OTP:    "/auth/resend-otp",
  REFRESH_TOKEN: "/auth/refresh-token",
  PAGE_HIT:      "/auth/page-hit",
};

export const DOCTOR = {
  GET_ALL:   "/doctors",
  GET_BY_ID: (id) => `/doctors/${id}`,
  CREATE:    "/doctors",
  UPDATE:    (id) => `/doctors/${id}`,
  DELETE:    (id) => `/doctors/${id}`,
};

export const APPOINTMENT = {
  GET_ALL:   "/appointments",
  GET_BY_ID: (id) => `/appointments/${id}`,
  BOOK:      "/appointments",
  UPDATE:    (id) => `/appointments/${id}`,
  CANCEL:    (id) => `/appointments/${id}/cancel`,
};

export const PATIENT = {
  GET_ALL:   "/patients",
  GET_BY_ID: (id) => `/patients/${id}`,
  UPDATE:    (id) => `/patients/${id}`,
  DELETE:    (id) => `/patients/${id}`,
};
