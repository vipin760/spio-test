import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import axios from 'axios';
import JwtService from 'src/app/auth/services/jwtService';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';

export const getSurfingPolicies = createAsyncThunk('accessPolicies/surfingPolicies/getSurfingPolicies', async (params,{ dispatch, getState }) => {
  let result=null;
  const master=getState()?.user?.data;
    try {
      const response = await JwtService.post(jwtServiceConfig.getAllSurfingPolicies,{
        "startIndex":0,
        "lastIndex":0,
        "institutionMasterId":master?.institutionMasterId,
        "institutionGatewayDetailId":master?.institutionGatewayDetailId
      })
      console.log("resp users",response?.data?.content)
      result= response?.data?.content;
       result = result.map(function(item) {
        return { ...item,id : item?.wifiSurfingPolicesId}
    })
  } catch (error) {
    console.log("get access error",error)
    if(error.response.status==403){
      JwtService.logout()
    }
  }
  // const response = await axios.get('/api/ecommerce/surfingPolicies');
  // const data = await response.data;

  return result;
});


const surfingPoliciesAdapter = createEntityAdapter({});

export const { selectAll: selectSurfingPolicies, selectById: selectProductById } =surfingPoliciesAdapter.getSelectors((state) => state?.accessPolicies?.surfingPolicies);

const surfingPoliciesSlice = createSlice({
  name: 'accessPolicies/surfingPolicies',
  initialState: surfingPoliciesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setSurfingPoliciesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getSurfingPolicies.fulfilled]: surfingPoliciesAdapter.setAll,
  },
});

export const { setSurfingPoliciesSearchText } = surfingPoliciesSlice.actions;

export const selectSurfingPolicySearchText = ({ accessPolicies }) => accessPolicies?.surfingPolicies?.searchText;

export default surfingPoliciesSlice.reducer;
