import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { apiClient } from "app/configs/apiClient";

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

//DELETE
export const removeProducts = createAsyncThunk(
  "virtualNoMapping/products",
  async (productIds, { dispatch, getState }) => {
    const query = ``;
    await axios.delete("/api/ecommerce/products", { data: productIds });
    return productIds;
  }
);

// Search

export const searchFilter = createAsyncThunk(
  "virtualNoMapping/products",
  async ({ val, page = 1, limit = 10 }, { dispatch, getState }) => {
    const query = ``;
    const response = await apiClient().get(`did/search/virtual-map?search=${val}&page=${page}&&limit=${limit}`);
    return response?.data;
  }
);

const productsAdapter = createEntityAdapter({
  selectId: (product) => product.tbl_connect_did_unique_id,
});

export const { selectAll: selectBranches, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state?.virtualNoMapping?.products || productsAdapter.getInitialState());

const productsSlice = createSlice({
  name: "virtualNoMapping",
  initialState: productsAdapter.getInitialState({
    searchText: "",
    meta:{}
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
      state.data = action.payload;
    }
    ),
      builder.addCase(searchFilter.fulfilled, (state, action) => {
        state.meta = action?.payload?.meta?.totalRecords,
        state.data = action.payload?.data
      })
  }
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = (state) => {
  return state?.virtualNoMapping?.products?.searchText || ""
};

export default productsSlice.reducer;
