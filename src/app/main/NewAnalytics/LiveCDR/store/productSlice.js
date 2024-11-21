import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { apiClient } from 'app/configs/apiClient';
import { actionButton } from 'aws-amplify';
import axios from 'axios';
import build from 'react-excel-renderer';

export const getProducts = createAsyncThunk('liveCdr/products', async (_, { dispatch, getState }) => {
  let result = null;
  try {    
    result = await apiClient().get(`/live-cdr`);
    console.log("result",result);
    
  } catch (error) {
    if (error?.response?.status == 403) {
      JwtService.logout();
    }
  }
  const data = result;
  return data?.data;
});

// SEARCH 

export const searchFilter = createAsyncThunk(
  "liveCDR/products",
  async ({ val, page = 1, limit = 10 }, { dispatch, getState }) => {
    const query = ``;
    console.log("val",val);
    
    try {
      const response = await apiClient().get(`/live-cdr?search=${val}&&page=${page}&&limit=${limit}`);
      return response?.data;
    } catch (err){
      if (err?.response?.status == 403) {
        JwtService.logout();
      }
    }
  }
);

const productsAdapter = createEntityAdapter({
  selectId: (product) => product?.id,
});

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state?.liveCdr?.product);

const productSlice = createSlice({
  name: 'liveCDR/products',
  initialState: productsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (value) => ({ payload: value || '' }),
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(getProducts.fulfilled,(state,action)=>{
      state.meta=action?.payload?.totalRecords
      state.data=action.payload?.data
    }),
    builder.addCase(searchFilter.fulfilled,(state,action)=>{
      state.meta=action?.payload?.totalRecords
      state.data=action.payload?.data
    })
  }
});

export const { setProductsSearchText } = productSlice.actions;

export const selectProductsSearchText = ({ state }) => state.products.searchText;

export default productSlice.reducer;
