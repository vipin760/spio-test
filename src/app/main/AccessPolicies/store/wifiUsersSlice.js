import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import axios from 'axios';
import JwtService from 'src/app/auth/services/jwtService';
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';

export const getWifiUsers = createAsyncThunk('accessPolicies/wifiUsers/getWifiUsers', async (params,{ dispatch, getState }) => {
  let result=null;
  const master=getState()?.user?.data;
    try {
      const response = await JwtService.post(jwtServiceConfig.getAllWifiUsers,{
        "startIndex":0,
        "lastIndex":0,
        institutionMasterId:master?.institutionMasterId,
       // institutionGatewayDetailId:master?.gateWay,
        ...params
      })

      console.log("resp getwifi users",params)
      result= response?.data?.content;
       result = result.map(function(item) {
        return { ...item,id : item?.wifiUserId}})
  } catch (error) {
    console.log("get access error",error)
    if(error.response.status==403){
      JwtService.logout()
    }
  }
  // const response = await axios.get('/api/ecommerce/wifiUsers');
  // const data = await response.data;

  return result;
});


const wifiUsersAdapter = createEntityAdapter({});

export const { selectAll: selectWifiUsers, selectById: selectProductById } =wifiUsersAdapter.getSelectors((state) => state?.accessPolicies?.wifiUsers);

const wifiUsersSlice = createSlice({
  name: 'accessPolicies/wifiUsers',
  initialState: wifiUsersAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setwifiUsersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getWifiUsers.fulfilled]: wifiUsersAdapter.setAll,
  },
});

export const { setWifiUsersSearchText } = wifiUsersSlice.actions;

export const selectWifiUserSearchText = ({ accessPolicies }) => accessPolicies?.wifiUsers?.searchText;

export default wifiUsersSlice.reducer;
