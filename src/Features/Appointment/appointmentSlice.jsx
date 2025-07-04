import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAppointmentThunk,
  deleteAppointmentThunk,
  updateAppointmentThunk,
  getActiveAppointmentThunk,
  getAppointmentThunk,
  getAppointmentByIdThunk,
  getActiveAppointmentByStudentIdThunk,
  getActiveAppointmentByInstructorIdThunk,
} from "./appointmentThunk";
const initialState = {
  isLoading: false,
  isEditing: false,
  appointments: [],
  appointmentsActive: [],
  appointmentsStudentActive: [],
  appointmentsInstructorActive: [],
  appointmentById: {},
};

export const getAppointment = createAsyncThunk("/getAppointment", getAppointmentThunk);

export const getActiveAppointment = createAsyncThunk(
  "/getActiveAppointment",
  getActiveAppointmentThunk
);

export const getActiveAppointmentByStudentId = createAsyncThunk(
  "/getActiveAppointmentByStudentId",
  getActiveAppointmentByStudentIdThunk
);

export const getActiveAppointmentByInstructorId = createAsyncThunk(
  "/getActiveAppointmentByInstructorId",
  getActiveAppointmentByInstructorIdThunk
);

export const getAppointmentById = createAsyncThunk("/getAppointmentById", getAppointmentByIdThunk);

export const createAppointment = createAsyncThunk("/createAppointment", createAppointmentThunk);

export const updateAppointment = createAsyncThunk("/updateAppointment", updateAppointmentThunk);

export const deleteAppointment = createAsyncThunk("/deleteAppointment", deleteAppointmentThunk);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.appointments = payload;
      })
      .addCase(getAppointment.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getActiveAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveAppointment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.appointmentsActive = payload;
      })
      .addCase(getActiveAppointment.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getActiveAppointmentByStudentId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveAppointmentByStudentId.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.appointmentsStudentActive = payload;
      })
      .addCase(getActiveAppointmentByStudentId.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getActiveAppointmentByInstructorId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveAppointmentByInstructorId.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.appointmentsInstructorActive = payload;
      })
      .addCase(getActiveAppointmentByInstructorId.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAppointmentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointmentById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.appointmentById = payload;
      })
      .addCase(getAppointmentById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAppointment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createAppointment.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAppointment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAppointment.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAppointment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAppointment.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

//export const { } = appointmentSlice.actions;

export default appointmentSlice.reducer;
