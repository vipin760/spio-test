import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { apiClient } from "app/configs/apiClient";

export const getProduct = createAsyncThunk(
  "virtualNoMapping/product/getProduct",
  async (productId, { dispatch, getState }) => {
    let result = null;
    try {
      result = await apiClient().get(`did/fetch/virtual-map/${productId}`);
    } catch (error) {
      if (error?.response?.status == 403) {
        JwtService.logout();
      }
    }
    const data = result;
    return data?.data?.data;
  }
);

export const removeProduct = createAsyncThunk(
  "virtualNoMapping/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().surfingPolicies.product;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  "virtualNoMapping/product/saveProduct",
  async (params, { rejectWithValue }) => {
    try {
      await apiClient().post('did/create/virtual-map', params);
    } catch (error) {
      console.log("service history ERROR", error);
      if (error.response.status == 403) {
        JwtService.logout();
      }
      return rejectWithValue(error?.response?.data?.message || "error");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "virtualNoMapping/product/updateProduct",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiClient().patch('/did/update/virtual-map', params);
      if (response.status === 200) {
        // If update was successful, dispatch the getProducts action to refresh the data
        return response.data;  // Return the updated product data or something meaningful
      }
    } catch (error) {
      console.log("Update Product ERROR:", error);
      if (error?.response?.status === 403) {
        JwtService.logout();
      }
      return rejectWithValue(
        error?.response?.data?.errors?.map((err) => err?.message || "").join(", ")
      );
    }
  }
);



const productSlice = createSlice({
  name: "virtualNoMapping/product",
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
    [getProduct.fulfilled]: (state, action) => action.payload,
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [updateProduct.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ virtualNoMapping }) => virtualNoMapping?.product;

export default productSlice.reducer;