import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { result } from "lodash";
import JwtService from "src/app/auth/services/jwtService";
import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";


export const getAllStatus = createAsyncThunk(
  "status/getStatus",
  async (params, { getState }) => {
    const response = await JwtService.post(jwtServiceConfig.getAllStatus, {
      startIndex: 0,
      lastIndex: 10,
      // institutionMasterId: getState().user?.data?.institutionMasterId,
    });
    result = response?.data?.content;
    result = result.map(function (item) {
      return { ...item, id: item?.statusId };
    });
    const data = await result;
    return data;
  }
);
const statusAdapter = createEntityAdapter({});

export const { selectAll: selectStatus, selectById: selectStatusById } =
  statusAdapter.getSelectors((state) =>{
    console.log("object",state)
   return state.surfingPolicies.StatusSlice});

const StatusSlice = createSlice({
  name: "surfingPolicies/StatusSlice",
  initialState: statusAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getAllStatus.fulfilled]: statusAdapter.setAll,
  },
});

export default StatusSlice.reducer;
