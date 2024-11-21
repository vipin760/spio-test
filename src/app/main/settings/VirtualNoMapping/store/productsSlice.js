// import {
//   createAsyncThunk,
//   createEntityAdapter,
//   createSlice,
// } from "@reduxjs/toolkit";
// import { apiClient } from "app/configs/apiClient";
// import { API } from "aws-amplify";
// import axios from "axios";
// import JwtService from "src/app/auth/services/jwtService";
// import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";



// export const getProducts = createAsyncThunk(
//   "did/all/virtual-map",
//   async () => {
//     // console.log("OOOOOOOOOOPA");
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
//     // console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ", { params });
//     // const { id: reviewId, value } = params;
//     const response = await apiClient().post(`/did/create/virtual-map`, params);
//     // console.log({ response: response });
//     return response.data;
//   }
// )

// // export const removeProducts = createAsyncThunk(
// //   "surfingPolicies/products",
// //   async (productIds, { dispatch, getState }) => {
// //     const query = ``;
// //     await axios.delete("/api/ecommerce/products", { data: productIds });

// //     return productIds;
// //   }
// // );




// const productsAdapter = createEntityAdapter({});

// export const { selectAll: selectBranches, selectById: selectProductById } =
//   productsAdapter.getSelectors((state) => state.surfingPolicies?.products);

// const productsSlice = createSlice({
//   name: "did/all/virtual-map",
//   initialState: productsAdapter.getInitialState({
//     searchText: "",
//   }),
//   reducers: {
//     setProductsSearchText: {
//       reducer: (state, action) => {
//         state.searchText = action.payload;
//       },
//       prepare: (event) => ({ payload: event.target.value || "" }),
//     },
//   },
//   extraReducers: {
//     [getProducts.fulfilled]: productsAdapter.setAll,
//     [removeProducts.fulfilled]: (state, action) =>
//       productsAdapter.removeMany(state, action.payload),
//   },
// });

// export const { setProductsSearchText } = productsSlice.actions;

// export const selectProductsSearchText = ({ surfingPolicies }) =>
//   surfingPolicies.products.searchText;

// export default productsSlice.reducer;



import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { apiClient } from "app/configs/apiClient";
import { act } from "react";


//GET

export const getProducts = createAsyncThunk(
  "did/all/virtual-map",
  async (params, { dispatch, getState }) => {
    let result = null;
    try {
      const response = await apiClient().get("did/all/virtual-map");
      result = response
    } catch (error) {
      if (error?.response?.status == 403) {
        JwtService.logout();
      }
    }
    return result;
  }
);

//DELETE
export const removeProducts = createAsyncThunk(
  "didMaster/products",
  async (productIds, { dispatch, getState }) => {
    const query = ``;
    await axios.delete("/api/ecommerce/products", { data: productIds });
    return productIds;
  }
);

// Search

export const searchFilter = createAsyncThunk(
  "didMaster/products",
  async (value, { dispatch, getState }) => {
    const query = ``;
    const response = await apiClient().get(`/did/search-did?did_no=${value}`);
    return response?.data?.data;
  }
);

const productsAdapter = createEntityAdapter({
  selectId: (product) => product.tbl_connect_did_unique_id,
});

export const { selectAll: selectBranches, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state?.didMaster?.products || productsAdapter.getInitialState());

const productsSlice = createSlice({
  name: "virtualNoMapping/products",
  initialState: productsAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {

    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (value) => ({ payload: value || "" }),
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload
    }
    ),
      builder.addCase(searchFilter.fulfilled, (state, action) => {
        state.data = action.payload
      })
  }
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = (state) => {
  return state?.didMaster?.products?.searchText || ""
};

export default productsSlice.reducer;