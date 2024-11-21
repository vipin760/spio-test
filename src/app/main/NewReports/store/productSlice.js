import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "app/configs/apiClient";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";


export const getReports = createAsyncThunk(
    "virtualNoMapping/product/getReports",
    async ({ filterdMonth, institutionGatewayDetailId }, { dispatch, getState }) => {
        let result = null;
        let payload;
        payload = filterdMonth.includes("startDate") ? filterdMonth : `datePeriod=${filterdMonth}`
        try {
            result = await apiClient().get(`reviews/leaderboard/chart?${payload}&gatewayDetailsId=${institutionGatewayDetailId}`);
        } catch (error) {
            if (error?.response?.status == 403) {
                JwtService.logout();
            }
        }
        const data = result;
        return data
    }
);


// export const getLocationWiseData = createAsyncThunk(
//     "virtualNoMapping/product/getReports",
//     async (filterdMonth, { dispatch, getState }) => {
//         let result = null;
//         try {
//             result = await apiClient().get(`reviews/response-rate-by-city/chart`);
//         } catch (error) {
//             if (error?.response?.status == 403) {
//                 JwtService.logout();
//             }
//         }
//         const data = result;
//         return data
//     }
// );




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
        [getReports.fulfilled]: (state, action) => action.payload,
        [getReports.fulfilled]: (state, action) => action.payload,
        [getReports.fulfilled]: (state, action) => action.payload,
        [getReports.fulfilled]: (state, action) => null,
    },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ virtualNoMapping }) => virtualNoMapping?.product;

export default productSlice.reducer;