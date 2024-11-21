import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "app/configs/apiClient";

// get review data
export const fetchReviews = createAsyncThunk(
  "/fetch/reviews",
  async ({ page = 1, limit = 10, selecetedDate, data, url }) => {
    const response = await apiClient().get(url, {
      params: {
        page: page,
        limit: limit,
        source: data?.source,
        search: data?.search,
        endDate: data?.endDate,
        isAnswered: data?.isAnswered,
        datePeriod: selecetedDate,
        startDate: data?.startDate,
        institutionGatewayDetailId: data?.institutionGatewayDetailId,
      }
    });
    return response.data;
  }
);


// get Employees
export const getEmployees = createAsyncThunk(
  "/fetch/reviewsss",
  async () => {
    const response = await apiClient().get('employee/get-all');
    return response.data;
  }
);


// patch for comment adding
export const replyReview = createAsyncThunk(
  "review/reply",
  async (params, thunkAPI) => {
    const { id: reviewId, value } = params;

    const response = await apiClient().post(`/reviews/${reviewId}/reply`, {
      platform_id: "1",
      reply_comment: params?.replyText,
    });
    return response.data;
  }
);

// Autogenerate Review using chatgpt public API
export const autoGenerateReviews = createAsyncThunk(
  "reviews",
  async (params, thunkAPI) => {
    const { id, value, styleValue, GR_name, rating } = params;

    const response = await apiClient().post(`/reviews/${id}/auto_reply`, {
      reviewText: value,
      style: styleValue ? styleValue : "simpler",
      reviewerName: GR_name,
      rating: rating
    });
    return response.data.response;
  }
);

// delete for whole review data
export const deleteComment = createAsyncThunk(
  "/delete/review",
  async ({ review_id, _id }, thunkAPI) => {

    const response = await apiClient().delete(`/reviews/${review_id}/reply/${_id}`, {
      data: {
        "platform_id": 1
      }
    });

    return { review_id, _id };
  }
);

// delete fro user comment
export const deleteUserReview = createAsyncThunk(
  "/delete/userReview",
  async (reviewId, thunkAPI) => {
    const response = await apiClient().delete(`/reviews/${reviewId}`);
    return response.data;
  }
);

const initialState = {
  reviews: [],
  review_error: null,
  total_reviews: 0,
};

const reviewSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    getReview(state, action) {
      return state.reviews;
    },
    updateReview(state, action) {
      state.reviews = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews = action.payload.data;
      state.review_error = null;
      state.total_reviews = action.payload.total_reviews_count;
    });
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.reviews = [];
    });
    builder.addCase(deleteUserReview.fulfilled, (state, action) => { });
    builder.addCase(deleteUserReview.pending, (state, action) => {
    });
    builder.addCase(deleteUserReview.rejected, (state, action) => {
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const { review_id, _id } = action.payload;
      const updatedReview = state.reviews.map((review) => {
        if (review.review_id == review_id) {
          review.reply_comment = review.reply_comment.filter((comment) => {
            return comment._id !== _id;
          });
        }
        return review;
      });
      state.reviews = updatedReview;
    });
    builder.addCase(deleteComment.pending, (state, action) => {
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
    });
    builder.addCase(replyReview.fulfilled, (state, action) => {
      fetchReviews();
    });
    builder.addCase(replyReview.pending, (state, action) => {
    });
    builder.addCase(replyReview.rejected, (state, action) => {
    });
  },
});

export default reviewSlice.reducer;