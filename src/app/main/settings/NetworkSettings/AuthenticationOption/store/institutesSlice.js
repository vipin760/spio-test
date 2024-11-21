import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { result } from "lodash";
import JwtService from "src/app/auth/services/jwtService";
import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";

export const getInstitutes = createAsyncThunk(
  "authOptions/institutes/getInstitutes",
  async (params, { getState }) => {
    const response = await JwtService.post(jwtServiceConfig.getAllInstitutes, {
      startIndex: 0,
      lastIndex: 10,
      institutionMasterId: getState()?.user.data.institutionMasterId,
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

const institutesAdapter = createEntityAdapter({});

export const { selectAll: selectInstitutes, selectById: selectInstitutesById } =
  institutesAdapter.getSelectors((state) => state.authOptions.institutes);

const institutesSlice = createSlice({
  name: "authOptions/institutes",
  initialState: institutesAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getInstitutes.fulfilled]: institutesAdapter.setAll,
  },
});

export default institutesSlice.reducer;
