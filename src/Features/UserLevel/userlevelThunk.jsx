import customFetch, { checkForUnauthorizedResponse } from "../../Utils/axios";

export const getUserLevelThunk = async (thunkAPI) => {
    try {
      const resp = await customFetch.get("/api/userlevels");
      return resp.data.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  };
  
  export const getActiveUserLevelThunk = async (thunkAPI) => {
    try {
      const resp = await customFetch.get("/api/userlevels/active");
      return resp.data.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  };
  
  export const getUserLevelByIdThunk = async (userlevelId, thunkAPI) => {
    try {
      const resp = await customFetch.get(`/api/userlevels/${userlevelId}`);
      return resp.data.data.userlevel;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  };
  
  export const createUserLevelThunk = async (userlevel, thunkAPI) => {
    try {
      const resp = await customFetch.post("/api/userlevels", userlevel);
      return resp.data.msg;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  };
  
  export const updateUserLevelThunk = async (
    { userlevelId, userlevel },
    thunkAPI
  ) => {
    try {
      const resp = await customFetch.put(
        `/api/userlevels/${userlevelId}`,
        userlevel
      );
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  };
  
  export const deleteUserLevelThunk = async (userlevelId, thunkAPI) => {
    try {
      const resp = await customFetch.delete(`/api/userlevels/${userlevelId}`);
      return resp.data.msg;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  };