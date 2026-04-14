import API, {
  handleResponse,
  handleError,
  processQueryParams,
  processFormData,
} from "../core";
import { DOCTOR } from "../../constant/apiEndpoints";

export const getAllDoctors = async (params) => {
  try {
    const res = await API.get(DOCTOR.GET_ALL, {
      params: processQueryParams(params),
    });
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const getDoctorById = async (id) => {
  try {
    const res = await API.get(DOCTOR.GET_BY_ID(id));
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const createDoctor = async (data, hasFile = false) => {
  try {
    const payload = hasFile ? processFormData(data) : data;
    const headers = hasFile ? { "Content-Type": "multipart/form-data" } : {};
    const res = await API.post(DOCTOR.CREATE, payload, { headers });
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const updateDoctor = async (id, data, hasFile = false) => {
  try {
    const payload = hasFile ? processFormData(data) : data;
    const headers = hasFile ? { "Content-Type": "multipart/form-data" } : {};
    const res = await API.put(DOCTOR.UPDATE(id), payload, { headers });
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteDoctor = async (id) => {
  try {
    const res = await API.delete(DOCTOR.DELETE(id));
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};
