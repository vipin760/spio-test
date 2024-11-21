import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import axios from 'axios';
import JwtService from 'src/app/auth/services/jwtService';

export const getAccessPolicies = createAsyncThunk('accessPolicies/products/getProducts', async (type,{getState}) => {
  let result=null;
    try {
      const response = await JwtService.post('wifiUserAccessPolicy/getAllWifiUserAccessPolicy',{
        "startIndex":0,
        "lastIndex":10,
        "wifiUserType":type,
        "institutionMasterId":getState()?.user?.data?.institutionMasterId
      })
      console.log("resp users",response?.data?.content)
      result= response?.data?.content;
       result = result.map(function(item) {
        return { ...item,id : item?.wifiUserAccessId}
    })
  } catch (error) {
    console.log("get access error",error)
    if(error.response.status==403){
      JwtService.logout()
    }
  }
 
  return result;
});

export const removeProducts = createAsyncThunk(
  'accessPolicies/products',
  async (productIds, { dispatch, getState }) => {
    const query=``
    await axios.delete('/api/ecommerce/products', { data: productIds });

    return productIds;
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectAccessPolicies, selectById: selectProductById } =productsAdapter.getSelectors((state) => state.accessPolicies?.products);

const productsSlice = createSlice({
  name: 'accessPolicies/products',
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
    [getAccessPolicies.fulfilled]: productsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = ({ accessPolicies }) => accessPolicies?.products?.searchText;

export default productsSlice.reducer;
