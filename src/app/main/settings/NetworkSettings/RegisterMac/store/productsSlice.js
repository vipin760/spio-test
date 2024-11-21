import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import axios from 'axios';
import JwtService from 'src/app/auth/services/jwtService';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';

export const getProducts = createAsyncThunk('registerMac/products/getProducts', async (params) => {
    let result=null;
    try {
      const response = await JwtService.post(jwtServiceConfig.getWifiRegisteredMacs,params)
      result= response?.data?.content;
       result = result.map(function(item) {
        return { ...item,id : item.wifiRegisteredMacId,total:response?.data?.totalNumberOfElements}
    })
  } catch (error) {
    if(error?.response?.status==403){
      JwtService.logout()
    }
    return rejectWithValue(error?.errors?.map((err) => (err?.message || '')).join(", "))
  }
  return result;
});

export const removeProducts = createAsyncThunk(
  'registerMac/products',
  async (productIds, { dispatch, getState }) => {
    const query=``
    await axios.delete('/api/ecommerce/products', { data: productIds });

    return productIds;
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectBranches, selectById: selectProductById } =productsAdapter.getSelectors((state) => state.registerMac?.products);

const productsSlice = createSlice({
  name: 'registerMac/products',
  initialState: productsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: productsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = ({ registerMac }) => registerMac.products.searchText;

export default productsSlice.reducer;
