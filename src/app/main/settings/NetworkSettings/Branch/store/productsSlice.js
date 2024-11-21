import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import axios from 'axios';
import JwtService from 'src/app/auth/services/jwtService';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';

export const getBranches = createAsyncThunk('branches/products/getProducts', async (data,{getState}) => {
  
  const params={
   ...data,
     "institutionMasterId": getState()?.user?.data.institutionMasterId
  }
    let result=null;
    try {
      const response = await JwtService.post(jwtServiceConfig.getInstitutionBranches,params)
      result= response?.data?.content;
       result = result.map(function(item) {
        return { ...item,id : item.institutionBranchId,total:response?.data?.totalNumberOfElements}
    })
  } catch (error) {
    if(error?.response?.status==403){
      JwtService.logout()
    }
  }

  return result;
});

export const removeProducts = createAsyncThunk(
  'branches/products',
  async (productIds, { dispatch, getState }) => {
    const query=``
    await axios.delete('/api/ecommerce/products', { data: productIds });

    return productIds;
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectBranches, selectById: selectProductById } =productsAdapter.getSelectors((state) => state.branches?.products);

const productsSlice = createSlice({
  name: 'branches/products',
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
    [getBranches.fulfilled]: productsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = ({ branches }) => branches.products.searchText;

export default productsSlice.reducer;
