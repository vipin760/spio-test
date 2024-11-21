import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import axios from 'axios';
import JwtService from 'src/app/auth/services/jwtService';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';

export const getAllBranches = createAsyncThunk('userDatabase/branches/getbranches', async (params) => {
    let result=null;
    try {
      const response = await JwtService.post(jwtServiceConfig.getInstitutionBranches,params)
      result= response?.data?.content;
       result = result.map(function(item) {
        return { ...item,id : item.institutionBranchId}
    })
  } catch (error) {
      console.log('getBranches ERROR', error)
  }
  // const response = await axios.get('/api/ecommerce/branches');
  // const data = await response.data;

  return result;
});


const branchesAdapter = createEntityAdapter({});

export const { selectAll: selectInstitutionBranches} =branchesAdapter.getSelectors((state) => state.userDatabase?.branches||"");

const branchesSlice = createSlice({
  name: 'userDatabase/branches',
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
    [getAllBranches.fulfilled]: branchesAdapter.setAll,
  },
});

export const { setbranchesSearchText } = branchesSlice.actions;

export const selectbranchesSearchText = ({ userDatabase }) => userDatabase.branches.searchText;

export default branchesSlice.reducer;
