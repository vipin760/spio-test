import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "app/configs/apiClient";


// GET BUSINESS NAME 
export const fetchReviews = createAsyncThunk(
  "/fetch/reviews",
  async ({ page = 1, limit = 10, data, url }) => {
    const response = await apiClient().post(url);
    return response.data;
  }
);

// HANDLING BUSUNESS NAME
export const postBusiness = createAsyncThunk(
  "/google/business/account",
  async (params, thunkAPI) => {
    const { name: reviewId } = params;
    const response = await apiClient().post(`/google/business/account`, {
      name: params?.name,
      platform_id: 1,
      gateway_details_id:params.institutionGatewayDetailId
    });
    console.log({ response: response });
    return response.data;  
  }
);

// HANDKING BUSINESS LOCATION
export const postBusinessLocation = createAsyncThunk(
  "/google/business/location",
  async (params, thunkAPI) => {
    const { name: reviewId } = params;
    const response = await apiClient().post(`/google/business/location`, {
      location: params?.name ,
      platform_id: 1,
      gateway_details_id: params.institutionGatewayDetailId
    });
    console.log({ response: response });
    return response.data;
  }
);