import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { result } from 'lodash';
import JwtService from 'src/app/auth/services/jwtService';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';

export const getGatewayDetails = createAsyncThunk(
  'registerMac/gateways/getGateways',
  async (params, { getState }) => {
    try{
      const response = await JwtService.post(jwtServiceConfig.companyList, {
        "startIndex": 0,
        "lastIndex": 0,
        ...params
      })
      console.log("resp users", response?.data?.content)
      result = response?.data?.content;
      result = result.map(function (item) {
        return { ...item }
      })
  
      const data=await result;
      return data;
    }catch (error) {
    if(error?.response?.status==403){
      JwtService.logout()
    }
    return rejectWithValue(error?.errors?.map((err) => (err?.message || '')).join(", "))
  }
   
  }
);

const gatewaysAdapter = createEntityAdapter({});

export const { selectAll: selectGateways} =
  gatewaysAdapter.getSelectors((state) => state.registerMac.gateways);

const gatewaysSlice = createSlice({
  name: 'registerMac/gateways',
  initialState: gatewaysAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getGatewayDetails.fulfilled]: gatewaysAdapter.setAll,
  },
});

export default gatewaysSlice.reducer;
