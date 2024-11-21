import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "app/configs/apiClient";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";


export const getProducts = createAsyncThunk(
    "virtualNoMapping/product/getProducts",
    async ({ filterdMonth, institutionGatewayDetailId }, { dispatch, getState }) => {
        let result = null;
        let payload;
        payload = filterdMonth.includes("startDate") ? filterdMonth : `datePeriod=${filterdMonth}`
        try {
            result = await apiClient().get(`reviews/response-time-distribution/chart?${payload}&city=${institutionGatewayDetailId}`);

        } catch (error) {
            if (error?.response?.status == 403) {
                JwtService.logout();
            }
        }
        const data = result;
        return data
    }
);

const productSlice = createSlice({
    name: "reviwsAndReports",
    initialState: null,
    reducers: {
        resetProduct: () => null,
        newProduct: {
            reducer: (state, action) => {
                action.payload
            },
            prepare: (event) => ({
                payload: {},
            }),
        },
    },
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => action.payload,
        [getProducts.fulfilled]: (state, action) => action.payload,
        [getProducts.fulfilled]: (state, action) => action.payload,
        [getProducts.fulfilled]: (state, action) => null,
    },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ virtualNoMapping }) => virtualNoMapping?.product;

export default productSlice.reducer;