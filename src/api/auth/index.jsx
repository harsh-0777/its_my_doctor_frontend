import API, { handleResponse, handleError } from "../core";
import { AUTH } from "../../constant/apiEndpoints";

export const signup = async (userData) => {
  try {
    const res = await API.post(AUTH.SIGNUP, userData);
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const login = async (credentials) => {
  try {
    const res = await API.post(AUTH.LOGIN, credentials);
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const verifyOTP = async (data) => {
  try {
    const res = await API.post(AUTH.VERIFY_OTP, data);
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const resendOTP = async (data) => {
  try {
    const res = await API.post(AUTH.RESEND_OTP, data);
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const refreshToken = async (token) => {
  try {
    const res = await API.post(AUTH.REFRESH_TOKEN, { refreshToken: token });
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const logout = async () => {
  try {
    const res = await API.post(AUTH.LOGOUT);
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const pageHit = async (page) => {
  try {
    const res = await API.post(AUTH.PAGE_HIT, { page });
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};
