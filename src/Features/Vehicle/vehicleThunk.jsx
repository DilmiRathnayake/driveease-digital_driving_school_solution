import customFetch, { checkForUnauthorizedResponse } from "../../Utils/axios";

export const getVehicleThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/vehicles");
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getActiveVehicleThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/vehicles/active");
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getVehicleByIdThunk = async (vehicleId, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/api/vehicles/${vehicleId}`);
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const createVehicleThunk = async (vehicle, thunkAPI) => {
  try {
    const resp = await customFetch.post("/api/vehicles", vehicle);
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateVehicleThunk = async (
  { vehicleId, vehicle },
  thunkAPI
) => {
  try {
    const resp = await customFetch.put(
      `/api/vehicles/${vehicleId}`,
      vehicle
    );
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteVehicleThunk = async (vehicleId, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/vehicles/${vehicleId}`);
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
