import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { result } from "lodash";
import JwtService from "src/app/auth/services/jwtService";
import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";

export const getSecretKey = createAsyncThunk(
  "secretKey/getSecretKey",
  async (params, { getState }) => {
    const response = await JwtService.post(jwtServiceConfig.getAllSecretKey, {
      startIndex: 0,
      lastIndex: 0,
    });
    result = response?.data?.content;
    result = result.map(function (item) {
      return { ...item, id: item?.wifiSecretKeyId};
    });
    const data = await result;
    return data;
  }
);


const secretKeyAdapter = createEntityAdapter({});

export const { selectAll: selectSecretKey, selectById: selectSecretKryById } =
  secretKeyAdapter.getSelectors((state) => state.surfingPolicies.secretKeySlice);

const secretKeySlice = createSlice({
  name: "surfingPolicies/secretKey",
  initialState: secretKeyAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getSecretKey.fulfilled]: secretKeyAdapter.setAll,
  },
});

export default secretKeySlice.reducer;
