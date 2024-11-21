import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import { apiClient } from "app/configs/apiClient";
import axios from "axios";
// import { apiClient } from "app/configs/apiClient";
import { act } from "react";


//GET

export const getProducts = createAsyncThunk(
    "virtualNoMapping/products/getProduct",
    async (params, { dispatch, getState }) => {
        let result = null;
        try {
            const response = await apiClient().get("did/all/virtual-map");
            result = response?.data?.data;
        } catch (error) {
            if (error?.response?.status == 403) {
                JwtService.logout();
            }
        }
        return result;
    }
);