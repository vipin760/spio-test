import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth";
import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";
import JwtService from "src/app/auth/services/jwtService";

export const getProduct = createAsyncThunk(
  "surfingPolicies/product/getProduct",
  async (productId, { dispatch, getState }) => {
    // const response = await axios.get(`/api/ecommerce/products/${productId}`);
    //  const data = await response;
    const params = {
      startIndex: 0,
      lastIndex: 0,
      surfingPoliciesId: productId,
    };
    let result = null;
    try {
      const response = await JwtService.post(
        jwtServiceConfig.getAllSurfingPolicies,
        params
      );
      result = response?.data?.content?.find(
        (e) => e?.wifiSurfingPolicesId == productId
      );
    } catch (error) {
      if (error?.response?.status == 403) {
        JwtService.logout();
      }
    }
    const data = await result;
    console.log(data, "iddata");
    return data;
  }
);

export const removeProduct = createAsyncThunk(
  "surfingPolicies/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().surfingPolicies.product;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  "surfingPolicies/product/saveProduct",
  async (params, { dispatch, getState, rejectWithValue }) => {
    params = {
      ...params,
      wifiSurfingPolicyCreatedTime: undefined,
      institutionMasterId: getState().user?.data?.institutionMasterId,
    };
    // console.log("branchdata", productData)

    try {
      const response = await JwtService.post(
        jwtServiceConfig.addSurfingPolicy,
        params
      );
      console.log("pram..................", response);
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
  name: "surfingPolicies/product",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          wifiSurfingPolicyIsActive: 1,
          wifiSurfingPolicyName: "",
          wifiSurfingPolicyDefault: 0,
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

export const selectProduct = ({ surfingPolicies }) => surfingPolicies.product;

export default productSlice.reducer;
