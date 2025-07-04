import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStudentsThunk,
  updateStudentThunk,
  createStudentThunk,
  getActiveStudentsThunk,
} from "./studentThunk";

const initialState = {
  isLoading: false,
  students: [],
  studentsActive: [],
};

export const getStudents = createAsyncThunk(
  "/getStudents",
  getStudentsThunk
);

export const getActiveStudents = createAsyncThunk(
  "/getActiveStudents",
  getActiveStudentsThunk
);

export const createStudent = createAsyncThunk(
  "/createStudent",
  createStudentThunk
);

export const updateStudent = createAsyncThunk(
  "/updateStudent",
  updateStudentThunk
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.students = payload;
      })
      .addCase(getStudents.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getActiveStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveStudents.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.studentsActive = payload;
      })
      .addCase(getActiveStudents.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudent.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createStudent.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStudent.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateStudent.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

//export const {  } = studentSlice.actions;
export default studentSlice.reducer;
