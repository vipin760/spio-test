import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "app/configs/apiClient";
import toast from "react-hot-toast";

// get review data
export const getGoogle = createAsyncThunk(
  "/google/oauth",
  async ({url}) => {
    const response = await apiClient().get(url);
    return response.data;
  }
);

export const getGoogleCode = createAsyncThunk(
  "google/business/accounts?code=",
  async ({code,url}) => {

    const response = await apiClient().get(`${url}${code}`);
    return response.data;
  }
);


// patch for comment adding
export const selectGoogleBusiness = createAsyncThunk(
  "/google/business/account",
  async (params, thunkAPI) => {
    console.log({ params },"paramsss????");
    const { body, name, url } = params;
    const response = await apiClient().put(url, {
      name,
    });
    console.log({ response: response });
    return response.data;
  }
);

const initialState = {
  googleIntegration: "",
  googleCode:[],
};

const integrationSlice = createSlice({
  name: "message",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getGoogle.fulfilled, (state, action) => {
      console.log("success", action.payload.data);
      state.googleIntegration = action.payload.data.redirectUrl;
    });
    builder.addCase(getGoogle.pending, (state, action) => {
      console.log("loading");
    });
    builder.addCase(getGoogle.rejected, (state, action) => {
      console.log("rejected");
    });
    builder.addCase(getGoogleCode.fulfilled, (state, action) => {
      state.googleCode = action.payload.data.accounts
      console.log(action.payload.data.accounts,"action.payload")
    });
    builder.addCase(getGoogleCode.pending, (state, action) => {
      console.log("loading");
    });
    builder.addCase(getGoogleCode.rejected, (state, action) => {
      console.log("rejected");
    });
    builder.addCase(selectGoogleBusiness.fulfilled, (state, action) => {
      toast.success("Business account added successfully");
      state.googleCode=[];
    });
    builder.addCase(selectGoogleBusiness.pending, (state, action) => {
      console.log("selectGoogleBusiness loading");
    });
    builder.addCase(selectGoogleBusiness.rejected, (state, action) => {
      console.error("Error deleting user review:", action.error);
    });
  },
});

export default integrationSlice.reducer;
