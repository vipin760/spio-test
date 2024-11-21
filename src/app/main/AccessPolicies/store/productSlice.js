import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth";
import JwtService from "src/app/auth/services/jwtService";

export const getProduct = createAsyncThunk(
  "accessPolicies/product/getProduct",
  async (productId, products, { dispatch, getState }) => {
    // const response = await axios.get(`/api/ecommerce/products/${productId}`);
    //  const data = await response;

    let result = null;
    try {
      result = products?.find((e) => e?.id == productId);
    } catch (error) {
      console.log("getOrg ERROR", error);
    }
    const data = await result;
    return data;
  }
);

export const removeProduct = createAsyncThunk(
  "accessPolicies/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().accessPolicies.product;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  "accessPolicies/product/saveProduct",
  async (params, { dispatch, getState, rejectWithValue }) => {
    params = {
      ...params,
      id: undefined,
      wifiUserAccessPolicyCreatedTime: undefined,
    };
    // console.log("branchdata", productData)

    try {
      const response = await JwtService.post(
        "wifiUserAccessPolicy/addNewWifiUserAccessPolicy",
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
    //const response1 = await axios.get('/api/contacts');

    // const data = { ...productData, id: result?._id, _id: result?._id };

    // const response = await axios.put(`/api/ecommerce/products/${id}`, productData);

    // const data = await response.data;
    return rejectWithValue("Something went Wrong");
  }
);

const productSlice = createSlice({
  name: "accessPolicies/product",
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          wifiUserAccessId: undefined,
          wifiUserId: null,
          wifiSurfingPoliciesId: null,
          statusId: 1,
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

export const selectProduct = ({ accessPolicies }) => accessPolicies?.product;

export default productSlice.reducer;
