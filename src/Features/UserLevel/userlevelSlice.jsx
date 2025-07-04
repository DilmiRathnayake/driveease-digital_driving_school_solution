import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserLevelThunk,
  deleteUserLevelThunk,
  updateUserLevelThunk,
  getActiveUserLevelThunk,
  getUserLevelThunk,
  getUserLevelByIdThunk,
} from "./userlevelThunk";
const initialState = {
  isLoading: false,
  isEditing: false,
  userLevels: [],
  userLevelsActive: [],
  userLevelById: {},
};

export const getUserLevel = createAsyncThunk(
  "/getUserLevel",
  getUserLevelThunk
);

export const getActiveUserLevel = createAsyncThunk(
  "/getActiveUserLevel",
  getActiveUserLevelThunk
);

export const getUserLevelById = createAsyncThunk(
  "/getUserLevelById",
  getUserLevelByIdThunk
);

export const createUserLevel = createAsyncThunk(
  "/createUserLevel",
  createUserLevelThunk
);

export const updateUserLevel = createAsyncThunk(
  "/updateUserLevel",
  updateUserLevelThunk
);

export const deleteUserLevel = createAsyncThunk(
  "/deleteUserLevel",
  deleteUserLevelThunk
);

const userlevelSlice = createSlice({
  name: "userlevel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserLevel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserLevel.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userLevels = payload;
      })
      .addCase(getUserLevel.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getActiveUserLevel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveUserLevel.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userLevelsActive = payload;
      })
      .addCase(getActiveUserLevel.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserLevelById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserLevelById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userLevelById = payload;
      })
      .addCase(getUserLevelById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createUserLevel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserLevel.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createUserLevel.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserLevel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserLevel.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserLevel.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUserLevel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserLevel.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUserLevel.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

//export const { } = userlevelSlice.actions;

export default userlevelSlice.reducer;
