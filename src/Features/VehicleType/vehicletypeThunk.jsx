import customFetch, { checkForUnauthorizedResponse } from "../../Utils/axios";

export const getVehicleTypeThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/vehicletypes");
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getActiveVehicleTypeThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/vehicletypes/active");
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getVehicleTypeByIdThunk = async (vehicletypeId, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/api/vehicletypes/${vehicletypeId}`);
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const createVehicleTypeThunk = async (vehicletype, thunkAPI) => {
  try {
    const resp = await customFetch.post("/api/vehicletypes", vehicletype);
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateVehicleTypeThunk = async (
  { vehicletypeId, vehicletype },
  thunkAPI
) => {
  try {
    const resp = await customFetch.put(
      `/api/vehicletypes/${vehicletypeId}`,
      vehicletype
    );
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteVehicleTypeThunk = async (vehicletypeId, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/vehicletypes/${vehicletypeId}`);
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
