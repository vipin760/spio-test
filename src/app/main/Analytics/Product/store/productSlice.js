import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "app/configs/apiClient";


export const fetchReviews = createAsyncThunk(
    "/fetch/reviews",
    async () => {
        const response = await apiClient().get('analytics');

        // console.log({ response: response });

        console.log("Resssssssssss", response);


        return response;
    }
);