import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import axios from 'axios';
import JwtService from 'src/app/auth/services/jwtService';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';


export const getDidMaster = createAsyncThunk(
  "/fetch/reviews",
  async ({ page = 1, limit = 10, data, url }) => {
    const response = await apiClient().get(url);

    console.log({ response: response });
    return response.data;
  }
);



export const getAdminUsers = createAsyncThunk('adminUsers/products/getProducts', async (params) => {
  let result = null;
  try {
    const response = await JwtService.post(jwtServiceConfig.getAllAdminUsers, params)
    result = response?.data?.content;
    result = result.map(function (item) {
      return { ...item, id: item.userId }
    })
  } catch (error) {
    console.log('getBranches ERROR', error)
  }
  // const response = await axios.get('/api/ecommerce/products');
  // const data = await response.data;

  return result;
});

export const removeProducts = createAsyncThunk(
  'adminUsers/products',
  async (productIds, { dispatch, getState }) => {
    const query = ``
    await axios.delete('/api/ecommerce/products', { data: productIds });

    return productIds;
  }
);


const productsAdapter = createEntityAdapter({});

export const { selectAll: selectAdminUsers, selectById: selectProductById } = productsAdapter.getSelectors((state) => state.adminUsers?.products || "");

const productsSlice = createSlice({
  name: 'adminUsers/products',
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
    [getAdminUsers.fulfilled]: productsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = ({ adminUsers }) => adminUsers.products.searchText;

export default productsSlice.reducer;
