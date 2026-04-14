import API, {
  handleResponse,
  handleError,
  processQueryParams,
  processFormData,
} from "../core";
import { PATIENT } from "../../constant/apiEndpoints";

export const getAllPatients = async (params) => {
  try {
    const res = await API.get(PATIENT.GET_ALL, {
      params: processQueryParams(params),
    });
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const getPatientById = async (id) => {
  try {
    const res = await API.get(PATIENT.GET_BY_ID(id));
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const updatePatient = async (id, data, hasFile = false) => {
  try {
    const payload = hasFile ? processFormData(data) : data;
    const headers = hasFile ? { "Content-Type": "multipart/form-data" } : {};
    const res = await API.put(PATIENT.UPDATE(id), payload, { headers });
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const deletePatient = async (id) => {
  try {
    const res = await API.delete(PATIENT.DELETE(id));
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};
