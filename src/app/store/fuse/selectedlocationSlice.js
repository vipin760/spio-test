import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "app/configs/apiClient";

const initialState = {
  selectedLocation: "",
  institutionGatewayDetailId: null
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    getLocations(state, action) {
        state.selectedLocation = action.payload.selectedLocation,
        state.institutionGatewayDetailId = action.payload.institutionGatewayDetailId
    },
  },
});

// console.log(initialState, "initialState")
export const { getLocations } = locationSlice.actions;
export default locationSlice.reducer;
