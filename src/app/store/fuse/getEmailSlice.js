import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "app/configs/apiClient";

// get review data
export const getReviews = createAsyncThunk(
  "/get/reviews",
  async ({ page = 1, limit = 10, email, date, url }) => {
    console.log({ baseUrl: process.env.REACT_APP_BASEURL });
    const response = await apiClient().get(url, {
      params: {
        email: email,
        date: date,
        page: page,
        limit: limit,
      },
    });

    console.log({ response: response });
    return response.data;
  }
);

// patch for comment adding
export const sendReviewRequest = createAsyncThunk(
  "review/reply",
  async (params, thunkAPI) => {
    console.log({ params });
    const { contacts, email_body, url } = params;
    const response = await apiClient().post(url, {
      contacts,
      email_body,
    });
    console.log({ response: response });
    return response.data;
  }
);

const initialState = {
  emailReviews: [],
  emailReviews_error: null,
  total_count: 0,
};

const reviewSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    getReview(state, action) {
      return state.emailReviews;
    },
    updateReview(state, action) {
      state.emailReviews = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReviews.fulfilled, (state, action) => {
      console.log("success", action.payload.data);
      state.emailReviews = action.payload.data;
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
