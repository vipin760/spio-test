import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { API } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';
import JwtService from 'src/app/auth/services/jwtService';

export const getProduct = createAsyncThunk('WifiSSid/product/getProduct', async (productId, { dispatch, getState }) => {

  // const response = await axios.get(`/api/ecommerce/products/${productId}`);
  //  const data = await response;
  const params={
    "startIndex":0,
    "lastIndex":0,
    "wifiSsidId":productId,
  }
    let result=null;
    try {
      const response = await JwtService.post(jwtServiceConfig.getWifiSSids,params)
      result= response?.data?.content?.find((e)=>e?.wifiSsidId==productId);
  } catch (error) {
    if(error?.response?.status==403){
      JwtService.logout()
    }
  }
  const data = await result;
  return data;
});

export const removeProduct = createAsyncThunk(
  'WifiSSid/product/removeProduct',
  async (val, { dispatch, getState }) => {
    const { id } = getState().WifiSSid.product;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  'WifiSSid/product/saveProduct',
  async (params, { dispatch, getState, rejectWithValue }) => {

    params = { ...params, wifiSsidCreatedTime: undefined }
    // console.log("branchdata", productData)

    try {
      const response = JwtService.post(jwtServiceConfig.addWifiSSid, params)
      return response?.data || null;
    } catch (error) {
      console.log('service history ERROR', error)
      if (error.response.status == 403) {
        JwtService.logout()
      }
      return rejectWithValue(error?.errors?.map((err) => (err?.message || '')).join(", "))
    }
  }
);

const productSlice = createSlice({
  name: 'WifiSSid/product',
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          wifiSsidStatus:1,
          wifiSsid:""
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

export const selectProduct = ({ WifiSSid }) => WifiSSid.product;

export default productSlice.reducer;
