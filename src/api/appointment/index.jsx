import API, { handleResponse, handleError, processQueryParams } from "../core";
import { APPOINTMENT } from "../../constant/apiEndpoints";

export const getAllAppointments = async (params) => {
  try {
    const res = await API.get(APPOINTMENT.GET_ALL, {
      params: processQueryParams(params),
    });
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const getAppointmentById = async (id) => {
  try {
    const res = await API.get(APPOINTMENT.GET_BY_ID(id));
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const bookAppointment = async (data) => {
  try {
    const res = await API.post(APPOINTMENT.BOOK, data);
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const updateAppointment = async (id, data) => {
  try {
    const res = await API.put(APPOINTMENT.UPDATE(id), data);
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const cancelAppointment = async (id) => {
  try {
    const res = await API.patch(APPOINTMENT.CANCEL(id));
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};
