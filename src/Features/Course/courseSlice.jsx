import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCourseThunk,
  deleteCourseThunk,
  updateCourseThunk,
  getActiveCourseThunk,
  getCourseThunk,
  getCourseByIdThunk,
  getInstructorsByCourseIdThunk,
  createCourseInstructorThunk,
} from "./courseThunk";
const initialState = {
  isLoading: false,
  isEditing: false,
  courses: [],
  coursesActive: [],
  courseById: {},
  courseInstructors: [],
};

export const getCourse = createAsyncThunk("/getCourse", getCourseThunk);

export const getActiveCourse = createAsyncThunk(
  "/getActiveCourse",
  getActiveCourseThunk
);

export const getCourseById = createAsyncThunk(
  "/getCourseById",
  getCourseByIdThunk
);

export const createCourse = createAsyncThunk(
  "/createCourse",
  createCourseThunk
);

export const updateCourse = createAsyncThunk(
  "/updateCourse",
  updateCourseThunk
);

export const deleteCourse = createAsyncThunk(
  "/deleteCourse",
  deleteCourseThunk
);

export const getInstructorsByCourseId = createAsyncThunk(
  "/getInstructorsByCourseId",
  getInstructorsByCourseIdThunk
);

export const createCourseInstructor = createAsyncThunk(
    "/createCourseInstructor",
    createCourseInstructorThunk
  );

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourse.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.courses = payload;
      })
      .addCase(getCourse.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getActiveCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveCourse.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.coursesActive = payload;
      })
      .addCase(getActiveCourse.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCourseById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourseById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.courseById = payload;
      })
      .addCase(getCourseById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createCourse.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCourse.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCourse.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCourse.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getInstructorsByCourseId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInstructorsByCourseId.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.courseInstructors = payload;
      })
      .addCase(getInstructorsByCourseId.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createCourseInstructor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCourseInstructor.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createCourseInstructor.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

//export const { } = courseSlice.actions;

export default courseSlice.reducer;
