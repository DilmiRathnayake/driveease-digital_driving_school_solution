import customFetch, { checkForUnauthorizedResponse } from "../../Utils/axios";
import { Warning } from "../../Components/Notification/Notification";

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);

    if (resp.data === undefined) {
      throw new Error("Custom Error Message");
    }

    if (resp.data.SystemUserId === 0) {
      throw new Error("Custom Error Message");
    }

    return resp.data.access_token;
  } catch (error) {
    Warning("Your email address or password is incorrect.");
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getSystemUsersThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/users");
    console.log("resp", resp)
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getSystemUserModuleThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/usermodules");
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getSystemUserPrevilegesBySystemUserLevelIdThunk = async (
  systemUserLevelId,
  thunkAPI
) => {
  try {
    const resp = await customFetch.get(
      `/api/userprivileges/${systemUserLevelId}`
    );
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const createSystemUserThunk = async (systemUser, thunkAPI) => {
  try {
    const resp = await customFetch.post("/api/users", systemUser);

    if (resp?.message === "Request failed with status code 400") {
      const errorDetails = JSON.stringify(resp.response.data.data);
      throw new Error(errorDetails);
    }

    return resp.data.msg;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const updateSystemUserThunk = async ({ id, user }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/users/${id}`, user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateSystemUserPasswordThunk = async (
  { systemUserId, systemUser },
  thunkAPI
) => {
  try {
    const resp = await customFetch.put(
      `/api/users/updatePassword/${systemUserId}`,
      systemUser
    );
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteSystemUserThunk = async (systemUserId, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/users/${systemUserId}`);
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const removeSystemUserPrivilegeBySystemUserIdThunk = async (
  systemUserId,
  thunkAPI
) => {
  try {
    const resp = await customFetch.delete(
      `/api/SystemUserPrivilege/RemoveSystemUserPrivilegeBySystemUserId/${systemUserId}`
    );
    console.log("asd", resp.data);
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const createSystemUserPrivilegeThunk = async (
  systemUserPrivilege,
  thunkAPI
) => {
  try {
    const resp = await customFetch.post(
      "/api/userprivileges",
      systemUserPrivilege
    );
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateSystemUserEmailThunk = async (url, systemUser, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, systemUser);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const checkEmailExitsThunk = async (url, systemUser, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, systemUser);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
