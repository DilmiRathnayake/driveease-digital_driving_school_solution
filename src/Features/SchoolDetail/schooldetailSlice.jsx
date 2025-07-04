import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateSchoolDetailThunk, getSchoolDetailThunk } from "./schooldetailThunk";
const initialState = {
  isLoading: false,
  isEditing: false,
  schoolDetail: {},
};

export const getSchoolDetail = createAsyncThunk(
  "/getSchoolDetail",
  getSchoolDetailThunk
);

export const updateSchoolDetail = createAsyncThunk(
  "/updateSchoolDetail",
  updateSchoolDetailThunk
);

const schooldetailSlice = createSlice({
  name: "schooldetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSchoolDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSchoolDetail.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.schoolDetail = payload;
      })
      .addCase(getSchoolDetail.rejected, (state) => {
        state.isLoading = false;
      })
      
      .addCase(updateSchoolDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSchoolDetail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateSchoolDetail.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

//export const { } = schooldetailSlice.actions;

export default schooldetailSlice.reducer;
