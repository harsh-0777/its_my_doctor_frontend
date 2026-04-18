import API, { handleResponse, handleError } from "../core";

const BASE = "/users";

// GET /api/v1/users — paginated user list (admin / super_admin)
export const getAllUsers = (params = {}) =>
  API.get(BASE, { params }).then(handleResponse).catch(handleError);
