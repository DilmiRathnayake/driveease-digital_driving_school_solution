import customFetch, { checkForUnauthorizedResponse } from "../../Utils/axios";

export const getInstructorsThunk = async (thunkAPI) => {
    try {
      const resp = await customFetch.get("/api/instructors");
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  };

  export const getActiveInstructorsThunk = async (thunkAPI) => {
    try {
      const resp = await customFetch.get("/api/instructors/active");
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  };

  export const createInstructorThunk = async (instructor, thunkAPI) => {
    try {
      const resp = await customFetch.post("/api/instructors", instructor);
  
      if (resp?.message === "Request failed with status code 400") {
        const errorDetails = JSON.stringify(resp.response.data.data);
        throw new Error(errorDetails);
      }
  
      return resp.data.msg;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  };

  export const updateInstructorThunk = async ({ id, instructor }, thunkAPI) => {
    try {
      const resp = await customFetch.put(`/api/instructors/${id}`, instructor);
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  };
