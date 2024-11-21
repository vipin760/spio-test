import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { API } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';
import JwtService from 'src/app/auth/services/jwtService';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';

export const getProduct = createAsyncThunk( '/google/business/accounts',async (urlParams, { dispatch, getState }) => {
 
  // `https://nodedevapi.spiolabs.com/google/business/accounts?code={urlParams}&platform_id=1`
 
  let result=null;
  console.log('selected user', users)
    try {

     const response = await JwtService.get(`?code=${urlParams}&platform_id=1`)
     console.log("response",response);
     
      // result= users;
  
      //  result = result?.find((e)=>result?.id==productId);
      //  result={...result,id:productId}
      //  console.log('selected user', result)
  } catch (error) {
      console.log('getBranches ERROR', error)
  }
  const data = await result;
  return data;
});

export const removeProduct = createAsyncThunk(
  'adminUsers/product/removeProduct',
  async (val, { dispatch, getState }) => {
    const { id } = getState().adminUsers.product;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  'adminUsers/product/saveProduct',
  async (productData, { dispatch, getState, rejectWithValue }) => {
    try {
      let result=null;
      const response = await JwtService.post('admin/register',productData)
      console.log("resp", response?.data)
      result = response?.data;
      return result;
    } catch (error) {
      console.log('service history ERROR', error)
      return rejectWithValue(error?.errors?.map((err) => (err?.message || '')).join(", "))
    }
  }
);
export const updateAdminUser = createAsyncThunk(
  'adminUsers/product/saveProduct',
  async (productData, { dispatch, getState, rejectWithValue }) => {
    try {
      let result=null;
      const response = await JwtService.post('admin/updateUser',productData)
      console.log("resp", response?.data)
      result = response?.data;
      return result;
    } catch (error) {
      console.log('service history ERROR', error)
      return rejectWithValue(error?.errors?.map((err) => (err?.message || '')).join(", "))
    }
  }
);



const productSlice = createSlice({
  name: 'adminUsers/product',
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: undefined,
          "userLoginName": "",
          "userLoginPassword": "",
          "institutionMasterId": "",
           "userProfileName": "",
          "userType": 3,
          "userStatusId": 1,
          "user2faStatus": 0,
          "userCreatedBy": 1,
        },
      }),
    },
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => action.payload,
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [updateAdminUser.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ adminUsers }) => adminUsers.product;

export default productSlice.reducer;
