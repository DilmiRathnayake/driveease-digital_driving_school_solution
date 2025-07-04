import customFetch, { checkForUnauthorizedResponse } from "../../Utils/axios";

export const getVehicleModelThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/vehiclemodels");
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getActiveVehicleModelThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/vehiclemodels/active");
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getVehicleModelByIdThunk = async (vehiclemodelId, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/api/vehiclemodels/${vehiclemodelId}`);
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const createVehicleModelThunk = async (vehiclemodel, thunkAPI) => {
  try {
    const resp = await customFetch.post("/api/vehiclemodels", vehiclemodel);
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateVehicleModelThunk = async (
  { vehiclemodelId, vehiclemodel },
  thunkAPI
) => {
  try {
    const resp = await customFetch.put(
      `/api/vehiclemodels/${vehiclemodelId}`,
      vehiclemodel
    );
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteVehicleModelThunk = async (vehiclemodelId, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/vehiclemodels/${vehiclemodelId}`);
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
