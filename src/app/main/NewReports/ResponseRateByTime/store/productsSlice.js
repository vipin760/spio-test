


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "app/configs/apiClient";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";


export const getData = createAsyncThunk(
    "virtualNoMapping/product/getData",
    async ({ chnageDate, institutionGatewayDetailId }, { dispatch, getState }) => {

        let result = null;
        let payload;
        payload = chnageDate.includes("startDate") ? chnageDate : `datePeriod=${chnageDate}`
        try {
            result = await apiClient().get(`reviews/response-rate-by-city/chart?${payload}&&gatewayDetailsId=${institutionGatewayDetailId}`);
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
        [getData.fulfilled]: (state, action) => action.payload,
        [getData.fulfilled]: (state, action) => action.payload,
        [getData.fulfilled]: (state, action) => action.payload,
        [getData.fulfilled]: (state, action) => null,
    },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ virtualNoMapping }) => virtualNoMapping?.product;

export default productSlice.reducer;