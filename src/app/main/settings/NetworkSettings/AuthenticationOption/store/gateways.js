import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { result } from "lodash";
import JwtService from "src/app/auth/services/jwtService";
import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";

export const getGatewayDetails = createAsyncThunk(
  "authOptions/gateways/getGateways",
  async (params, { getState }) => {
    const response = await JwtService.post(jwtServiceConfig.companyList, {
      startIndex: 0,
      lastIndex: 10,
      institutionMasterId: getState()?.user.data.institutionMasterId,

      ...params,
    });
    console.log("resp users", response?.data?.content);
    result = response?.data?.content;
    result = result.map(function (item) {
      return { ...item };
    });

    const data = await result;
    return data;
  }
);

const gatewaysAdapter = createEntityAdapter({});

export const { selectAll: selectGateways } = gatewaysAdapter.getSelectors(
  (state) => state.authOptions.gateways
);

const gatewaysSlice = createSlice({
  name: "authOptions/gateways",
  initialState: gatewaysAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getGatewayDetails.fulfilled]: gatewaysAdapter.setAll,
  },
});

export default gatewaysSlice.reducer;
