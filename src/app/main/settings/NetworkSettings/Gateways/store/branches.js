import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { result } from "lodash";
import JwtService from "src/app/auth/services/jwtService";
import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";

export const getBranches = createAsyncThunk(
  "surfingPolicies/branches/getBranches",
  async (params, { getState }) => {
    const response = await JwtService.post(
      jwtServiceConfig.getInstitutionBranches,
      {
        startIndex: 0,
        lastIndex: 0,
        institutionMasterId:params?.institutionMasterId
        //  getState().user?.data?.institutionMasterId,
        // ...params
      }
    );    
    result = response?.data?.content;
    result = result.map(function (item) {
      return { ...item, id: item?.institutionBranchId };
    });
    // const data=await result;
    return result;
  }
);

const branchesAdapter = createEntityAdapter({});

export const { selectAll: selectBranches } = branchesAdapter.getSelectors(
  (state) => state.surfingPolicies.branches
);

const branchesSlice = createSlice({
  name: "surfingPolicies/branches",
  initialState: branchesAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getBranches.fulfilled]: branchesAdapter.setAll,
  },
});

export default branchesSlice.reducer;
