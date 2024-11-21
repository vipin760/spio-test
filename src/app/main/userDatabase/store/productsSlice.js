import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import axios from 'axios';
import JwtService from 'src/app/auth/services/jwtService';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';

export const getUsers = createAsyncThunk('userDatabase/products/getProducts', async (params, { dispatch, getState }) => {
  console.log("getState",getState())
  const master=getState()?.user?.data;
    let result=null;
    try {
      const response = await JwtService.post(jwtServiceConfig.getAllWifiUsers,{
        institutionMasterId:master?.institutionMasterId,
        //institutionGatewayDetailId:master?.gateWay,
        ...params
      })
      console.log("resp getwifi users",response?.data?.content)
      result= response?.data?.content;
       result = result?.map(function(item) {
        return { ...item,id : item?.wifiUserId,total:response?.data?.totalNumberOfElements}
    })
  } catch (error) {
    if(error?.response?.status==403){
      JwtService.logout()
    }
      console.log('getBranches ERROR', error)
  }
  // const response = await axios.get('/api/ecommerce/products');
  // const data = await response.data;

  return result;
});

export const removeProducts = createAsyncThunk(
  'userDatabase/products',
  async (productIds, { dispatch, getState }) => {
    const query=``
    await axios.delete('/api/ecommerce/products', { data: productIds });

    return productIds;
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectProductById } =productsAdapter.getSelectors((state) => state.userDatabase?.products);

const productsSlice = createSlice({
  name: 'userDatabase/products',
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
    [getUsers.fulfilled]: productsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = ({ userDatabase }) => userDatabase.products.searchText;

export default productsSlice.reducer;
