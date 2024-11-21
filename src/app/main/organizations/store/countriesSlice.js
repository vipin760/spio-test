import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCountries = createAsyncThunk(
  'organizationsApp/countries/getCountries',
  async (params, { getState }) => {
    const response = await axios.get('/api/countries');

    const data = await response.data;

    return data;
  }
);

const countriesAdapter = createEntityAdapter({});

export const { selectAll: selectCountries, selectById: selectCountriesById } =
  countriesAdapter.getSelectors((state) => state.organizationsApp.countries);

const countriesSlice = createSlice({
  name: 'organizationsApp/countries',
  initialState: countriesAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getCountries.fulfilled]: countriesAdapter.setAll,
  },
});

export default countriesSlice.reducer;
