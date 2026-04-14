import API, { handleResponse, handleError } from "../core";
import { CONTACT } from "../../constant/apiEndpoints";

export const submitContact = (data) =>
  API.post(CONTACT.SUBMIT, data).then(handleResponse).catch(handleError);

export const getAllContacts = (params = {}) =>
  API.get(CONTACT.GET_ALL, { params }).then(handleResponse).catch(handleError);

export const updateContactStatus = (id, status) =>
  API.patch(CONTACT.UPDATE_STATUS(id), { status }).then(handleResponse).catch(handleError);
