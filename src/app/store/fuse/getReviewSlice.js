import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "app/configs/apiClient";

// get review data
export const getReviews = createAsyncThunk(
  "/get/reviews",
  async ({ page = 1, limit = 10, mob, date, url }) => {
    console.log('==============>url',url);

    console.log({ baseUrl: process.env.REACT_APP_BASEURL });
    const response = await apiClient().get(url, {
      params: {
        mob: mob,
        date: date,
        page: page,
        limit: limit,
      },
    });

    return response.data;
  }
);

// patch for comment adding
export const sendReviewRequest = createAsyncThunk(
  "review/reply",
  async (params, thunkAPI) => {
    console.log({ params });
    const { contacts, message_body, url } = params;
    const response = await apiClient().post(url, {
      contacts,
      message_body,
    });
    console.log({ response: response });
    return response.data;
  }
);

const initialState = {
  mobileReviews: [],
  mobileReviews_error: null,
  total_count: 0,
};

const reviewSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    getReview(state, action) {
      return state.mobileReviews;
    },
    updateReview(state, action) {
      state.mobileReviews = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReviews.fulfilled, (state, action) => {
      console.log("success", action.payload.data);
      state.mobileReviews = action.payload.data;
      state.total_count = action.payload.total_count;
    });
    builder.addCase(getReviews.pending, (state, action) => {
      console.log("loading");
    });
    builder.addCase(getReviews.rejected, (state, action) => {
      console.log("rejected");
      //   state.review_error = "data not found";
    });
    builder.addCase(sendReviewRequest.fulfilled, (state, action) => {
      console.log("success");
    });
    builder.addCase(sendReviewRequest.pending, (state, action) => {
      console.log("loading");
    });
    builder.addCase(sendReviewRequest.rejected, (state, action) => {
      console.log("rejected");
    });
  },
});

export default reviewSlice.reducer;
