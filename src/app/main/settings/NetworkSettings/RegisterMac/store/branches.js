import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { result } from 'lodash';
import JwtService from 'src/app/auth/services/jwtService';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';

export const getBranches = createAsyncThunk(
  'registerMac/branches/getBranches',
  async (params, { getState }) => {
    try{
      const response = await JwtService.post(jwtServiceConfig.getInstitutionBranches, {
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

const branchesAdapter = createEntityAdapter({});

export const { selectAll: selectBranches, selectById: selectBranchesById } =
  branchesAdapter.getSelectors((state) => state.registerMac.branches);

const branchesSlice = createSlice({
  name: 'registerMac/branches',
  initialState: branchesAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getBranches.fulfilled]: branchesAdapter.setAll,
  },
});

export default branchesSlice.reducer;
