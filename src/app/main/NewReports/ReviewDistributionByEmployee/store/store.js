import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "app/configs/apiClient";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";


export const getResponceTime = createAsyncThunk(
    "virtualNoMapping/product/getResponceTime",
    async ({ chnageDate, institutionGatewayDetailId }, { dispatch, getState }) => {
        let result = null;
        try {
            result = await apiClient().get(`employee/reviews-rating?${chnageDate}&city=${institutionGatewayDetailId}`);
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
        [getResponceTime.fulfilled]: (state, action) => action.payload,
        [getResponceTime.fulfilled]: (state, action) => action.payload,
        [getResponceTime.fulfilled]: (state, action) => action.payload,
        [getResponceTime.fulfilled]: (state, action) => null,
    },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ virtualNoMapping }) => virtualNoMapping?.product;

export default productSlice.reducer;