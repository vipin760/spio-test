import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import axios from 'axios';

export const getBranches = createAsyncThunk('bedsApp/branches/getBranches', async () => {
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
export const getbranches = createAsyncThunk('bedsApp/branches/getbranches', async () => {
  const response = await axios.get('/api/ecommerce/branches');
  const data = await response.data;

  return data;
});

export const removebranches = createAsyncThunk(
  'bedsApp/branches/removebranches',
  async (orderIds, { dispatch, getState }) => {
    await axios.delete('/api/ecommerce/branches', { data: orderIds });

    return orderIds;
  }
);

const branchesAdapter = createEntityAdapter({});

export const { selectAll: selectbranches, selectById: selectOrderById } = branchesAdapter.getSelectors(
  (state) => state.bedsApp.branches
);

const branchesSlice = createSlice({
  name: 'bedsApp/branches',
  initialState: branchesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setbranchesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getBranches.fulfilled]: branchesAdapter.setAll,
    [removebranches.fulfilled]: (state, action) => branchesAdapter.removeMany(state, action.payload),
  },
});

export const { setbranchesSearchText } = branchesSlice.actions;

export const selectbranchesSearchText = ({ bedsApp }) => bedsApp.branches.searchText;

export default branchesSlice.reducer;
