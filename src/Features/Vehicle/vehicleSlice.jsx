import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createVehicleThunk,
  deleteVehicleThunk,
  updateVehicleThunk,
  getActiveVehicleThunk,
  getVehicleThunk,
  getVehicleByIdThunk,
} from "./vehicleThunk";
const initialState = {
  isLoading: false,
  isEditing: false,
  vehicles: [],
  vehiclesActive: [],
  vehicleById: {},
};

export const getVehicle = createAsyncThunk("/getVehicle", getVehicleThunk);

export const getActiveVehicle = createAsyncThunk(
  "/getActiveVehicle",
  getActiveVehicleThunk
);

export const getVehicleById = createAsyncThunk("/getVehicleById", getVehicleByIdThunk);

export const createVehicle = createAsyncThunk("/createVehicle", createVehicleThunk);

export const updateVehicle = createAsyncThunk("/updateVehicle", updateVehicleThunk);

export const deleteVehicle = createAsyncThunk("/deleteVehicle", deleteVehicleThunk);

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVehicle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.vehicles = payload;
      })
      .addCase(getVehicle.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getActiveVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveVehicle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.vehiclesActive = payload;
      })
      .addCase(getActiveVehicle.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getVehicleById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVehicleById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.vehicleById = payload;
      })
      .addCase(getVehicleById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVehicle.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createVehicle.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVehicle.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateVehicle.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVehicle.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteVehicle.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

//export const { } = vehicleSlice.actions;

export default vehicleSlice.reducer;
