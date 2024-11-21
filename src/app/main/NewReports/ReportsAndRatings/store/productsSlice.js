import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import { apiClient } from "app/configs/apiClient";

// GET Products
export const getProducts = createAsyncThunk(
    "reviewsAndRatings/products/getAll",
    async ({ chnageDate, institutionGatewayDetailId }, { dispatch, getState }) => {
        let result = null;
        try {
            const response = await apiClient().get(`reviews/reviews-rating/chart?${chnageDate}&city=${institutionGatewayDetailId}`);
            result = response?.data?.obj;
        } catch (error) {
            if (error?.response?.status === 403) {
                JwtService.logout();
            }
        }
        return result;
    }
);


const monthlyReviewsAdapter = createEntityAdapter({});

// Selectors for monthly reviews
export const {
    selectAll: selectAllMonthlyReviews,
    selectById: selectMonthlyReviewById
} = monthlyReviewsAdapter.getSelectors(
    (state) => {
        return state.reviewsAndRatings?.products || monthlyReviewsAdapter.getInitialState()
    }
);

// Create the slice
const productsSlice = createSlice({
    name: "reviewsAndRatings",
    initialState: {
        averageRatings: null,  // Default value for averageRatings
        monthlyReviews: monthlyReviewsAdapter.getInitialState() // Use adapter for monthly reviews
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            if (action.payload) {
                // Set average ratings
                state.averageRatings = action.payload.averageRatings;
                state.data = action.payload?.monthlyReviews?.length > 0 ? action.payload?.monthlyReviews : action.payload?.reviewsData;
            }
        });
    }
});

// Export the reducer
export default productsSlice.reducer;