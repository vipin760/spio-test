import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import axios from 'axios';
import JwtService from 'src/app/auth/services/jwtService';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';

export const getInstitutes = createAsyncThunk('institutes/products/getProducts', async (params, { dispatch, getState }) => {
  console.log("getState",getState())
  const master=getState()?.user?.data;
  console.log("master",master)
  let result = null;
  try {
    const response = await JwtService.post(jwtServiceConfig.getAllInstitutes, {
      institutionMasterId:master?.institutionMasterId,
      // "startIndex": 0,
      // "lastIndex": 0,
      ...params
    })
    console.log("resp users", response?.data?.content)
    result = response?.data?.content;
    result = result.map(function (item) {
      return { ...item, id: item?.institutionMasterId ,total:response?.data?.totalNumberOfElements}
    })
  } catch (error) {
    console.log("get access error", error)
    if (error.response.status == 403) {
      JwtService.logout()
    }
    console.log('getBranches ERROR', error)
  }
  // return result;
    const res= result.sort((a,b)=>a.institutionName.localeCompare(b.institutionName));
   return res;
}
  );

export const removeProducts = createAsyncThunk(
  'institutes/products',
  async (productIds, { dispatch, getState }) => {
    const query = ``
    await axios.delete('/api/ecommerce/products', { data: productIds });

    return productIds;
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectBranches, selectById: selectProductById } = productsAdapter.getSelectors((state) => state.institutes?.products);

const productsSlice = createSlice({
  name: 'institutes/products',
  initialState: productsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getInstitutes.fulfilled]: productsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = ({ institutes }) => institutes.products.searchText;

export default productsSlice.reducer;
