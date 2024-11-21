import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import axios from 'axios';

export const getNotifications = createAsyncThunk('notificationPanel/getData', async (bedsList) => {

  const query = `query getBedsData($beds: [ID]!) {
    getBedsData(bed_ids: $beds) {
      MaxPressure
      PressureCenterX
      PressureCenterY
      PressureMap
      RecognizedPosture
      RecognizedPresence
      _id
      absenceStatus
      hardwareId
      lastUpdatedTime
      ulCerStatus
      room {
        name
      }
      bed {
        name
        _id
      }
      floor {
        name
      }
      branch {
        branch_name
      }
    }
  }`;
  try {
    const bedsData = await API.graphql({
      query: query,
      variables: { beds: bedsList || [] },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })
    return bedsData?.data?.getBedsData?.map((bd, i) => ({ ...bd, id: `${bd._id}+${i}` }));
  } catch (error) {
    console.log('Error In getting Notifications', error)
  }
return []
});

export const dismissAll = createAsyncThunk('notificationPanel/dismissAll', async () => {
  const response = await axios.delete('/api/notifications');
  await response.data;

  return true;
});

export const dismissItem = createAsyncThunk('notificationPanel/dismissItem', async (id) => {
  const response = await axios.delete(`/api/notifications/${id}`);
  await response.data;

  return id;
});

export const addNotification = createAsyncThunk(
  'notificationPanel/addNotification',
  async (item) => {
    const response = await axios.post(`/api/notifications`, { ...item });
    const data = await response.data;

    return data;
  }
);

const notificationsAdapter = createEntityAdapter({});

const initialState = notificationsAdapter.upsertMany(notificationsAdapter.getInitialState(), []);


export const { selectAll: selectNotifications, selectById: selectNotificationsById } = notificationsAdapter.getSelectors((state) => state.notificationPanel.data);

const dataSlice = createSlice({
  name: 'notificationPanel/data',
  initialState,
  reducers: {},
  extraReducers: {
    [dismissItem.fulfilled]: (state, action) => notificationsAdapter.removeOne(state, action.payload),
    [dismissAll.fulfilled]: (state, action) => notificationsAdapter.removeAll(state),
    [getNotifications.fulfilled]: (state, action) => notificationsAdapter.addMany(state, action.payload),
    [addNotification.fulfilled]: (state, action) => notificationsAdapter.addOne(state, action.payload),
  },
});

export default dataSlice.reducer;

export const getBedsTestFromDB = () => {
  return async () => {
    try {
      // dispatch(dataSlice.actions.getBedsTest([1, 2, 3, 4]));
    } catch (error) {
    }
  };
}