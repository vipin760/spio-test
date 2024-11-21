import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { API } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';
import JwtService from 'src/app/auth/services/jwtService';

export const getProduct = createAsyncThunk('registerMac/product/getProduct', async (productId, { dispatch, getState }) => {

  // const response = await axios.get(`/api/ecommerce/products/${productId}`);
  //  const data = await response;
  const params={
    "startIndex":0,
    "lastIndex":0,
    "wifiRegisteredMacId":productId
  }
    let result=null;
    try {
      const response = await JwtService.post(jwtServiceConfig.getWifiRegisteredMacs,params)
      result= response?.data?.content;
       result = result[0]
  } catch (error) {
    if(error?.response?.status==403){
      JwtService.logout()
    }
  }
  const data = await result;
  return data;
});

export const removeProduct = createAsyncThunk(
  'registerMac/product/removeProduct',
  async (val, { dispatch, getState }) => {
    const { id } = getState().registerMac.product;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  'registerMac/product/saveProduct',
  async (params, { dispatch, getState, rejectWithValue }) => {

    params = { ...params, wifiRegisteredMacCreatedTime: undefined }
    // console.log("branchdata", productData)

    try {
      const response = JwtService.post(jwtServiceConfig.addWifiRegisterMac, params)
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
  name: 'registerMac/product',
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          wifiRegisteredMacsStatus:1,
          wifiRegisteredMac:""
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

export const selectProduct = ({ registerMac }) => registerMac.product;

export default productSlice.reducer;
