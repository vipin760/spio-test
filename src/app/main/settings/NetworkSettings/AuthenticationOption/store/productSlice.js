import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth";
import JwtService from "src/app/auth/services/jwtService";
import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";

export const getProduct = createAsyncThunk(
  "authOptions/product/getProduct",
  async (productId, { dispatch, getState }) => {
    // const response = await axios.get(`/api/ecommerce/products/${productId}`);
    //  const data = await response;
    const params = {
      startIndex: 0,
      lastIndex: 10,
      institutionMasterId: getState()?.user.data.institutionMasterId,
      wifiAuthOptionId: productId,
    };

    let result = null;
    try {
      const response = await JwtService.post(
        jwtServiceConfig.getWifiAuthOptions,
        params
      );
      result = response?.data?.content;
      result = result[0];
    } catch (error) {
      if (error?.response?.status == 403) {
        JwtService.logout();
      }
    }
    const data = await result;
    return data;
  }
);

export const removeProduct = createAsyncThunk(
  "authOptions/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().authOptions.product;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  "authOptions/product/saveProduct",
  async (params, { dispatch, getState, rejectWithValue }) => {
    params = {
      ...params,
      wifiAuthOptionCreatedTime: undefined,
      institutionMasterId: getState()?.user.data.institutionMasterId,
    };
    // console.log("branchdata", productData)

    try {
      const response = JwtService.post(
        jwtServiceConfig.addWifiAuthOptions,
        params
      );
      return response?.data || null;
    } catch (error) {
      console.log("service history ERROR", error);
      if (error.response.status == 403) {
        JwtService.logout();
      }
      return rejectWithValue(
        error?.errors?.map((err) => err?.message || "").join(", ")
      );
    }
  }
);

const productSlice = createSlice({
  name: "authOptions/product",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          wifiAuthOptionIsActive: 1,
          wifiAuthEmailOtp: 0,
          wifiAuthmobileOtp: 0,
          wifiAuthLogin: 0,
          wifiAuthMac: 0,
        },
      }),
    },
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => action.payload,
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ authOptions }) => authOptions.product;

export default productSlice.reducer;
