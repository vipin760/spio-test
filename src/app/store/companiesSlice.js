import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JwtService from "../auth/services/jwtService";
import jwtServiceConfig from "../auth/services/jwtService/jwtServiceConfig";

export const getCompanies = createAsyncThunk(
  "companies/getCompanies",
  async (param) => {
    const params = {
      startIndex: 0,
      lastIndex: 0,
      ...param,
    };
    const response = await JwtService.getCompanyListData(params);
    let data = await response?.data?.content;
    if (data.length === 0) {
     
    } else {
      data = data?.map((item) => {
        return { ...item, id: item?.institutionGatewayDetailId };
      });
    }

    return data;
  }
);

export const removeCompanies = createAsyncThunk(
  "companies/companies",
  async (productIds, { dispatch, getState }) => {
    await axios.delete("/api/ecommerce/companies", { data: productIds });

    return productIds;
  }
);

const companiesAdapter = createEntityAdapter({});

export const { selectAll: selectCompanies } = companiesAdapter.getSelectors(
  (state) => state.companies
);

const companiesSlice = createSlice({
  name: "companies",
  initialState: companiesAdapter.getInitialState({
    searchText: "",
    data: []
  }),
  reducers: {
    setCompaniesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getCompanies.fulfilled]: companiesAdapter.setAll,
    [removeCompanies.fulfilled]: (state, action) =>
      companiesAdapter.removeMany(state, action.payload),
  },
});

export const { setCompaniesSearchText } = companiesSlice.actions;

export const selectCompaniesSearchText = ({ companies }) => {
  return companies ? companies.searchText : "";
};

export default companiesSlice.reducer;
