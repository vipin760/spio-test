import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import axios from 'axios';

export const getProducts = createAsyncThunk('bedsApp/task/getProducts', async () => {
  // const response = await axios.get('/api/ecommerce/products');
  // const data = await response.data;

  const query = `query MyQuery {
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
        floor_id
      }
      beds {
        _id
        name
        org_id
        room_id
        device_id
        branch_id
      }
    }
  }`
  const res = await API.graphql({
    query: query,
    variables: {},
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
  });
  let result = res?.data?.getBranches;
  let data = [];
  result?.forEach((branch) => {
    console.log('rooms', branch.rooms)
    const rooms = branch?.rooms?.map((room) => {
      return { ...room, id: room?._id + "_" + branch?._id, address: branch?.address?.address_line1, floor_name: (branch?.floors?.find((item) => item?._id === room?.floor_id))?.name, branch_id: branch?._id }
    })
    console.log('final rooms', rooms);
    data.push(...rooms)
  })

  console.log("rooms", data);
  return data;
});


export const removeProducts = createAsyncThunk(
  'bedsApp/products',
  async (productIds, { dispatch, getState }) => {
    await axios.delete('/api/ecommerce/products', { data: productIds });

    return productIds;
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.bedsApp.products);

const productsSlice = createSlice({
  name: 'bedsApp/products',
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
    [getProducts.fulfilled]: productsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = ({ bedsApp }) => bedsApp.products.searchText;

export default productsSlice.reducer;
