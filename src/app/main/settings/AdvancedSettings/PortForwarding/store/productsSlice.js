import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import axios from 'axios';

export const getBranches = createAsyncThunk('eCommerceApp/products/getProducts', async () => {
  const query=`query MyQuery {
    getBranches {
      address {
        address_line1
        address_line2
        city
        country
        state
        zip_code
      }
      _id
      branch_name
      contacts {
        contact
        name
        tag
      }
      email
      no_of_floors
      org_id
      floors {
        _id
        floor
        name
        no_of_rooms
        status
      }
      rooms {
        _id
        name
        status
        no_of_beds
      }
      category
      description
    }
  }
  
    `
    let result=null;
    try {
      const response = await API.graphql({
          query: query,
      })
      console.log("resp getBranches",response?.data?.getBranches)
      result= response?.data?.getBranches;
       result = result.map(function(item) {
        return { ...item,id : item._id}
    })
  } catch (error) {
      console.log('getBranches ERROR', error)
  }
  // const response = await axios.get('/api/ecommerce/products');
  // const data = await response.data;

  return result;
});

export const removeProducts = createAsyncThunk(
  'eCommerceApp/products',
  async (productIds, { dispatch, getState }) => {
    const query=``
    await axios.delete('/api/ecommerce/products', { data: productIds });

    return productIds;
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectBranches, selectById: selectProductById } =productsAdapter.getSelectors((state) => state.eCommerceApp?.products);

const productsSlice = createSlice({
  name: 'eCommerceApp/products',
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

export const selectProductsSearchText = ({ eCommerceApp }) => eCommerceApp.products.searchText;

export default productsSlice.reducer;
