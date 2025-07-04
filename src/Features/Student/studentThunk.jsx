import customFetch, { checkForUnauthorizedResponse } from "../../Utils/axios";

export const getStudentsThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/students");
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getActiveStudentsThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/students/active");
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const createStudentThunk = async (student, thunkAPI) => {
  try {
    const resp = await customFetch.post("/api/students", student);

    if (resp?.message === "Request failed with status code 400") {
      const errorDetails = JSON.stringify(resp.response.data.data);
      throw new Error(errorDetails);
    }

    return resp.data.msg;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const updateStudentThunk = async ({ id, student }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/students/${id}`, student);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
