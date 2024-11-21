import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "app/configs/apiClient";
import axios from "axios";
import { useSelector } from "react-redux";
import JwtService from "src/app/auth/services/jwtService";


// const { institutionGatewayDetailId } = useSelector(
//     (state) => state.fuse.selectLocation
// );

export const getLocationWiseData = createAsyncThunk(
    "virtualNoMapping/product/getLocationWiseData",
    async ({ filterdMonth, institutionGatewayDetailId }, { dispatch, getState }) => {
        let result = null;
        let payload;
        payload = filterdMonth.includes("startDate") ? filterdMonth : `datePeriod=${filterdMonth}`
        try {
            result = await apiClient().get(`reviews/location/chart?${payload}&gatewayDetailsId=${institutionGatewayDetailId}`);
        } catch (error) {
            if (error?.response?.status == 403) {
                JwtService.logout();
            }
        }
        const data = result;
        return data
    }
);
// sfdfsduf
// gatewayDetailsId=101
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
        [getLocationWiseData.fulfilled]: (state, action) => action.payload,
        [getLocationWiseData.fulfilled]: (state, action) => action.payload,
        [getLocationWiseData.fulfilled]: (state, action) => action.payload,
        [getLocationWiseData.fulfilled]: (state, action) => null,
    },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ virtualNoMapping }) => virtualNoMapping?.product;

export default productSlice.reducer;