import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createVehicleTypeThunk,
  deleteVehicleTypeThunk,
  updateVehicleTypeThunk,
  getActiveVehicleTypeThunk,
  getVehicleTypeThunk,
  getVehicleTypeByIdThunk,
} from "./vehicletypeThunk";
const initialState = {
  isLoading: false,
  isEditing: false,
  vehicleTypes: [],
  vehicleTypesActive: [],
  vehicleTypeById: {},
};

export const getVehicleType = createAsyncThunk("/getVehicleType", getVehicleTypeThunk);

export const getActiveVehicleType = createAsyncThunk(
  "/getActiveVehicleType",
  getActiveVehicleTypeThunk
);

export const getVehicleTypeById = createAsyncThunk("/getVehicleTypeById", getVehicleTypeByIdThunk);

export const createVehicleType = createAsyncThunk("/createVehicleType", createVehicleTypeThunk);

export const updateVehicleType = createAsyncThunk("/updateVehicleType", updateVehicleTypeThunk);

export const deleteVehicleType = createAsyncThunk("/deleteVehicleType", deleteVehicleTypeThunk);

const vehicletypeSlice = createSlice({
  name: "vehicletype",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVehicleType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVehicleType.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.vehicleTypes = payload;
      })
      .addCase(getVehicleType.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getActiveVehicleType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveVehicleType.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.vehicleTypesActive = payload;
      })
      .addCase(getActiveVehicleType.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getVehicleTypeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVehicleTypeById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.vehicleTypeById = payload;
      })
      .addCase(getVehicleTypeById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createVehicleType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVehicleType.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createVehicleType.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateVehicleType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVehicleType.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateVehicleType.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteVehicleType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVehicleType.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteVehicleType.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

//export const { } = vehicletypeSlice.actions;

export default vehicletypeSlice.reducer;
