// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import FuseUtils from "@fuse/utils";
// import { API } from "aws-amplify";
// import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth";
// import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";
// import JwtService from "src/app/auth/services/jwtService";
// import { apiClient } from "app/configs/apiClient";


// export const getProduct = createAsyncThunk(
//   "did/all/virtual-map",
//   async () => {
//     let result = null;
//     try {
//       const response = await apiClient().get("/did/all/virtual-map")
//       result = response;
//     } catch (error) {
//       // console.log("ERRRRRRRRRRRR", error);
//     }
//     return result;
//   }
// );

// export const saveProduct = createAsyncThunk(
//   "did/create/virtual-map",
//   async (params, thunkAPI) => {
//     const response = await apiClient().post(`/did/create/virtual-map`, params);
//     return response.data;
//   }
// )



// export const removeProduct = createAsyncThunk(
//   "surfingPolicies/product/removeProduct",
//   async (val, { dispatch, getState }) => {
//     const { id } = getState().surfingPolicies.product;
//     await axios.delete(`/api/ecommerce/products/${id}`);
//     return id;
//   }
// );



// const productSlice = createSlice({
//   name: "did/all/virtual-map",
//   initialState: null,
//   reducers: {
//     resetProduct: () => null,
//     newProduct: {
//       reducer: (state, action) => action.payload,
//       prepare: (event) => ({
//         payload: {
//           wifiSurfingPolicyIsActive: 1,
//           wifiSurfingPolicyName: "",
//           wifiSurfingPolicyDefault: 0,
//         },
//       }),
//     },
//   },
//   extraReducers: {
//     [getProduct.fulfilled]: (state, action) => action.payload,
//     [saveProduct.fulfilled]: (state, action) => action.payload,
//     [removeProduct.fulfilled]: (state, action) => null,
//   },
// });

// export const { newProduct, resetProduct } = productSlice.actions;

// export const selectProduct = ({ virtualNoMapping }) => virtualNoMapping?.product;

// export default productSlice.reducer;

















import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import { apiClient } from "app/configs/apiClient";



export const getProduct = createAsyncThunk(
  "did/all/virtual-map",
  async (productId, { dispatch, getState }) => {
    let result = null;
    try {
      result = await apiClient().get(`did/all/virtual-map`);
    } catch (error) {
      if (error?.response?.status == 403) {
        JwtService.logout();
      }
    }
    const data = result;

    console.log(".........", data?.data?.data);

    return data
  }
);
// .payload?.data?.data

export const getOneProduct = createAsyncThunk(
  "did/fetch-did/1",
  async (params, { dispatch, getState }) => {
    let result = null;
    try {
      const response = await apiClient().get(`did/fetch/virtual-map/${params}`);
      // console.log("............", response);
      result = response
    } catch (error) {
      if (error?.response?.status == 403) {
        JwtService.logout();
      }
    }
    return result?.data?.data
  }
);

export const removeProduct = createAsyncThunk(
  "didMaster/product/removeProduct",
  async (val, { dispatch, getState }) => {
    const { id } = getState().surfingPolicies.product;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  "/did/create/virtual-map",
  async (params, { dispatch, getState }) => {
    try {
      await apiClient().post('/did/create/virtual-map', params);
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

export const updateProduct = createAsyncThunk(
  "didMaster/product/updateProduct",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiClient().patch('did/update/virtual-map', params);
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
  name: "virtualNomMapping/product",
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

export const selectProduct = ({ didMaster }) => didMaster?.product;

export default productSlice.reducer;