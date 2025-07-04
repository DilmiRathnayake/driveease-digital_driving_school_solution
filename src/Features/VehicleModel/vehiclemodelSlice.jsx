import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createVehicleModelThunk,
  deleteVehicleModelThunk,
  updateVehicleModelThunk,
  getActiveVehicleModelThunk,
  getVehicleModelThunk,
  getVehicleModelByIdThunk,
} from "./vehiclemodelThunk";
const initialState = {
  isLoading: false,
  isEditing: false,
  vehicleModels: [],
  vehicleModelsActive: [],
  vehicleModelById: {},
};

export const getVehicleModel = createAsyncThunk("/getVehicleModel", getVehicleModelThunk);

export const getActiveVehicleModel = createAsyncThunk(
  "/getActiveVehicleModel",
  getActiveVehicleModelThunk
);

export const getVehicleModelById = createAsyncThunk("/getVehicleModelById", getVehicleModelByIdThunk);

export const createVehicleModel = createAsyncThunk("/createVehicleModel", createVehicleModelThunk);

export const updateVehicleModel = createAsyncThunk("/updateVehicleModel", updateVehicleModelThunk);

export const deleteVehicleModel = createAsyncThunk("/deleteVehicleModel", deleteVehicleModelThunk);

const vehiclemodelSlice = createSlice({
  name: "vehiclemodel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVehicleModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVehicleModel.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.vehicleModels = payload;
      })
      .addCase(getVehicleModel.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getActiveVehicleModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveVehicleModel.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.vehicleModelsActive = payload;
      })
      .addCase(getActiveVehicleModel.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getVehicleModelById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVehicleModelById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.vehicleModelById = payload;
      })
      .addCase(getVehicleModelById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createVehicleModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVehicleModel.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createVehicleModel.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateVehicleModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVehicleModel.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateVehicleModel.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteVehicleModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVehicleModel.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteVehicleModel.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

//export const { } = vehiclemodelSlice.actions;

export default vehiclemodelSlice.reducer;
