import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { result } from 'lodash';
import JwtService from 'src/app/auth/services/jwtService';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';

export const getInstitutes = createAsyncThunk(
  'registerMac/institutes/getInstitutes',
  async (params, { getState }) => {

    try{
      const response = await JwtService.post(jwtServiceConfig.getAllInstitutes, {
        "startIndex": 0,
        "lastIndex": 0,
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

const institutesAdapter = createEntityAdapter({});

export const { selectAll: selectInstitutes, selectById: selectInstitutesById } =
  institutesAdapter.getSelectors((state) => state.registerMac.institutes);

const institutesSlice = createSlice({
  name: 'registerMac/institutes',
  initialState: institutesAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getInstitutes.fulfilled]: institutesAdapter.setAll,
  },
});

export default institutesSlice.reducer;
