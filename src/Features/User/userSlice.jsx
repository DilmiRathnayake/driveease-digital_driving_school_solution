import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../Utils/localStorage";
import {
  loginUserThunk,
  getSystemUserModuleThunk,
  getSystemUsersThunk,
  updateSystemUserThunk,
  updateSystemUserPasswordThunk,
  deleteSystemUserThunk,
  createSystemUserThunk,
  removeSystemUserPrivilegeBySystemUserIdThunk,
  createSystemUserPrivilegeThunk,
  updateSystemUserEmailThunk,
  checkEmailExitsThunk,
  getSystemUserPrevilegesBySystemUserLevelIdThunk,
} from "./userThunk";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  systemUsers: [],
  systemUserModules: [],
  systemUserPrivileges: [],
  isEmailValid: false,
  error: [],
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/api/auth/login", user, thunkAPI);
  }
);

export const getSystemUsers = createAsyncThunk(
  "/getSystemUsers",
  getSystemUsersThunk
);

export const getSystemUserModule = createAsyncThunk(
  "/getSystemUserModule",
  getSystemUserModuleThunk
);

export const createSystemUser = createAsyncThunk(
    "/SystemUser",
    createSystemUserThunk
  );

export const updateSystemUser = createAsyncThunk(
  "/updateSystemUser",
  updateSystemUserThunk
);

export const updateSystemUserPassword = createAsyncThunk(
  "/updateSystemUserPassword",
  updateSystemUserPasswordThunk
);

export const deleteSystemUser = createAsyncThunk(
  "/deleteSystemUser",
  deleteSystemUserThunk
);

export const getSystemUserPrevilegesBySystemUserLevelId = createAsyncThunk(
  "/getSystemUserPrevilegesBySystemUserLevelId",
  getSystemUserPrevilegesBySystemUserLevelIdThunk
);

export const removeSystemUserPrivilegeBySystemUserLevelId = createAsyncThunk(
  "/removeSystemUserPrivilegeBySystemUserId",
  removeSystemUserPrivilegeBySystemUserIdThunk
);

export const createSystemUserPrivilege = createAsyncThunk(
  "/createSystemUserPrivilege",
  createSystemUserPrivilegeThunk
);

export const updateSystemUserEmail = createAsyncThunk(
  "/updateSystemUserEmail",
  async (systemUser, thunkAPI) => {
    return updateSystemUserEmailThunk(
      "/api/SystemUser/CheckSystemUserEmailExitsWithSystemUser",
      systemUser,
      thunkAPI
    );
  }
);

export const checkEmailExists = createAsyncThunk(
  "/checkEmailExits",
  async (systemUser, thunkAPI) => {
    return checkEmailExitsThunk(
      "/api/users/checkEmailExits",
      systemUser,
      thunkAPI
    );
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
    makeEmailInvalid: (state, { payload }) => {
      state.isEmailValid = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        addUserToLocalStorage(payload);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getSystemUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSystemUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.systemUsers = payload;
      })
      .addCase(getSystemUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getSystemUserModule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSystemUserModule.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.systemUserModules = payload;
      })
      .addCase(getSystemUserModule.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateSystemUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSystemUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updateSystemUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateSystemUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSystemUserPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updateSystemUserPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteSystemUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSystemUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(deleteSystemUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(createSystemUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSystemUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createSystemUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error(payload);
      })
      .addCase(getSystemUserPrevilegesBySystemUserLevelId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getSystemUserPrevilegesBySystemUserLevelId.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.systemUserPrivileges = payload;
        }
      )
      .addCase(
        getSystemUserPrevilegesBySystemUserLevelId.rejected,
        (state, { payload }) => {
          state.isLoading = false;
          toast.error(payload);
        }
      )
      .addCase(
        removeSystemUserPrivilegeBySystemUserLevelId.pending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addCase(
        removeSystemUserPrivilegeBySystemUserLevelId.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
        }
      )
      .addCase(
        removeSystemUserPrivilegeBySystemUserLevelId.rejected,
        (state, { payload }) => {
          state.isLoading = false;
          toast.error(payload);
        }
      )
      .addCase(createSystemUserPrivilege.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSystemUserPrivilege.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createSystemUserPrivilege.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateSystemUserEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSystemUserEmail.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (payload > 0) {
          state.isEmailValid = false;
        } else if (payload === 0) {
          state.isEmailValid = true;
        }
      })
      .addCase(updateSystemUserEmail.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(checkEmailExists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkEmailExists.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(checkEmailExists.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { logoutUser, makeEmailInvalid } = userSlice.actions;
export default userSlice.reducer;
