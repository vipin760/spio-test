import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { apiClient } from "app/configs/apiClient";

//GET

export const getProducts = createAsyncThunk(
  "didMaster/products/getProduct",
  async (params, { dispatch, getState }) => {
    let result = null;
    try {
      const response = await apiClient().get("/did/all-did");
      result = response?.data;
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
  async ({ val, page = 1, limit = 10 }, { dispatch, getState }) => {
    const query = ``;    
    try {
      // const response = await apiClient().get(`/did/search-did?did_no=${value}`);
      const response = await apiClient().get(`/did/search-did?search=${val}&&page=${page}&&limit=${limit}`);
      return response?.data;
    } catch (err){
      if (err?.response?.status == 403) {
        JwtService.logout();
      }
    }
  }
);

const productsAdapter = createEntityAdapter({
  selectId: (product) => product.tbl_connect_did_unique_id,
});

export const { selectAll: selectBranches, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state?.didMaster?.products || productsAdapter.getInitialState()); 

const productsSlice = createSlice({
  name: "didMaster",
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
  extraReducers: (builder)=>{
    builder.addCase(getProducts.fulfilled,(state,action)=>{
      state.data=action?.payload?.data
    }
  ),
  builder.addCase(searchFilter.fulfilled,(state,action)=>{
    state.meta = action?.payload?.meta?.totalRecords
      state.data=action.payload?.data;
    })
  }
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = (state) => {
  return state?.didMaster?.products?.searchText || ""};

export default productsSlice.reducer;
