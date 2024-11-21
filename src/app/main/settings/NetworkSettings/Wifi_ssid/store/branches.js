import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { result } from 'lodash';
import JwtService from 'src/app/auth/services/jwtService';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';

export const getBranches = createAsyncThunk(
  'WifiSSid/branches/getBranches',
  async (params, { getState }) => {
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
  }
);

const branchesAdapter = createEntityAdapter({});

export const { selectAll: selectBranches, selectById: selectBranchesById } =
  branchesAdapter.getSelectors((state) => state.WifiSSid.branches);

const branchesSlice = createSlice({
  name: 'WifiSSid/branches',
  initialState: branchesAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getBranches.fulfilled]: branchesAdapter.setAll,
  },
});

export default branchesSlice.reducer;
