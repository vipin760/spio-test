import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import axios from 'axios';
import JwtService from 'src/app/auth/services/jwtService';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';

export const getProducts = createAsyncThunk('WifiSSid/products/getProducts', async (params) => {
  // const params={
  //   "startIndex":0,
  //   "lastIndex":0,
  //   "wifiSsidStatus":"1,2,3,4"
  // }
    let result=null;
    try {
      const response = await JwtService.post(jwtServiceConfig.getWifiSSids,params)
      result= response?.data?.content;
       result = result.map(function(item) {
        return { ...item,id : item.wifiSsidId,total:response?.data?.totalNumberOfElements}
    })
  } catch (error) {
    if(error?.response?.status==403){
      JwtService.logout()
    }
  }
  // const response = await axios.get('/api/ecommerce/products');
  // const data = await response.data;

  return result;
});

export const removeProducts = createAsyncThunk(
  'WifiSSid/products',
  async (productIds, { dispatch, getState }) => {
    const query=``
    await axios.delete('/api/ecommerce/products', { data: productIds });

    return productIds;
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectBranches, selectById: selectProductById } =productsAdapter.getSelectors((state) => state.WifiSSid?.products);

const productsSlice = createSlice({
  name: 'WifiSSid/products',
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

export const selectProductsSearchText = ({ WifiSSid }) => WifiSSid.products.searchText;

export default productsSlice.reducer;
