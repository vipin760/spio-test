import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { API } from "aws-amplify";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";
import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";

export const getProducts = createAsyncThunk(
  "surfingPolicies/products/getProducts",
  async (params, { dispatch, getState }) => {
    // console.log('getState..............',getState())
    const data = {
      'startIndex': 0,
      'lastIndex': 0,
      'institutionMasterId': getState().user?.data?.institutionMasterId,
    };
    let result = null;
    try {
      const response = await JwtService.post(
        jwtServiceConfig.getAllSurfingPolicies,
        data
      );
      result = response?.data?.content;
      result = result.map(function (item) {
        return {
          ...item,
          id: item.wifiSurfingPolicesId,
          total: response?.data?.totalNumberOfElements,
        };
      });
    } catch (error) {
      if (error?.response?.status == 403) {
        JwtService.logout();
      }
    }
    // const response = await axios.get('/api/ecommerce/products');
    // const data = await response.data;

    return result;
  }
);

export const removeProducts = createAsyncThunk(
  "surfingPolicies/products",
  async (productIds, { dispatch, getState }) => {
    const query = ``;
    await axios.delete("/api/ecommerce/products", { data: productIds });

    return productIds;
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectBranches, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.surfingPolicies?.products);
console.log("selectProductById",selectProductById);

const productsSlice = createSlice({
  name: "surfingPolicies/products",
  initialState: productsAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: productsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = ({ surfingPolicies }) =>
  surfingPolicies.products.searchText;

export default productsSlice.reducer;
