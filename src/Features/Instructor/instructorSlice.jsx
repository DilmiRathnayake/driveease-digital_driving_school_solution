import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getInstructorsThunk,
  updateInstructorThunk,
  createInstructorThunk,
  getActiveInstructorsThunk,
} from "./instructorThunk";

const initialState = {
  isLoading: false,
  instructors: [],
  instructorsActive: [],
};

export const getInstructors = createAsyncThunk(
  "/getInstructors",
  getInstructorsThunk
);

export const getActiveInstructors = createAsyncThunk(
  "/getActiveInstructors",
  getActiveInstructorsThunk
);

export const createInstructor = createAsyncThunk(
  "/createInstructor",
  createInstructorThunk
);

export const updateInstructor = createAsyncThunk(
  "/updateInstructor",
  updateInstructorThunk
);

const instructorSlice = createSlice({
  name: "instructor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInstructors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInstructors.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.instructors = payload;
      })
      .addCase(getInstructors.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getActiveInstructors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveInstructors.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.instructorsActive = payload;
      })
      .addCase(getActiveInstructors.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createInstructor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInstructor.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createInstructor.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateInstructor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInstructor.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateInstructor.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

//export const {  } = instructorSlice.actions;
export default instructorSlice.reducer;
