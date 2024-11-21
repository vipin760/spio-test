import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { API } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';
import JwtService from 'src/app/auth/services/jwtService';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';

export const getProduct = createAsyncThunk('branches/product/getProduct', async (productId, { dispatch, getState }) => {

  // const response = await axios.get(`/api/ecommerce/products/${productId}`);
  //  const data = await response;
  const query = `query MyQuery {
    getBranch (id:"${productId}"){
      address {
        address_line1
        address_line2
        city
        country
        state
        zip_code
      }
      _id
      branch_name
      contacts {
        contact
        name
        tag
      }
      email
      
      no_of_floors
      org_id
      floors {
        _id
        floor
        name
        no_of_rooms
        status
      }
      rooms {
        _id
        name
        status
        no_of_beds
        floor_id
      }
      category
      description
    }
  }
  
    `
  let result = null;
  try {
    const response = await API.graphql({
      query: query,
    })

    result = response?.data?.getBranch;

    let floors = result?.floors?.map((floor) => {
      const rooms = result?.rooms?.filter((room) => room?.floor_id === floor?._id)
      return {
        ...floor, rooms: rooms
      }
    })

    result = { ...result, id: result?._id, floors: floors }
    console.log("resp product", result)
  } catch (error) {
    console.log('getOrg ERROR', error)
  }
  const data = await result;
  return data;
});

export const removeProduct = createAsyncThunk(
  'branches/product/removeProduct',
  async (val, { dispatch, getState }) => {
    const { id } = getState().branches.product;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  'branches/product/saveProduct',
  async (productData, { dispatch, getState, rejectWithValue }) => {

    // console.log("branchdata", productData)
    const { id } = getState().branches;

    let result = null;
    
    try {
      const params = {
        ...productData,
        institutionCreatedTime:undefined
      }
      const response = await JwtService.post(jwtServiceConfig.addInstitutionBranch,params)
      console.log("resp", response?.data?.createBranch)
      result = response?.data?.createBranch;
      return { ...productData, id: result?._id, _id: result?._id };
    } catch (error) {
      if(error?.response?.status==403){
        JwtService.logout()
      }
      console.log('service history ERROR', error)
      return rejectWithValue(error?.errors?.map((err)=>(err?.message || '')).join(", "))
    }
    
  }
);

const productSlice = createSlice({
  name: 'branches/product',
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          "institutionBranchName":"",
          "isActive":1,
           "institutionBranchAddress": "",
          "institutionBranchContactNumber": "",
          "institutionBranchGst": ""
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

export const selectProduct = ({ branches }) => branches.product;

export default productSlice.reducer;
