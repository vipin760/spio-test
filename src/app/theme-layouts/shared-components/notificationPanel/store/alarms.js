import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';

export const getBeds = createAsyncThunk('notificationPanel/getBeds', async () => {

  const query = `query getBeds {
    getBeds {
      _id 
    }
  }`;
  try {
    const bedsData = await API.graphql({
      query: query,
      variables: { },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })
    return bedsData?.data?.getBeds?.map((bd, i) => ({ ...bd, id: `${bd._id}+${i}` }));
  } catch (error) {
    console.log('Error In getting Beds', error)
  }
return []
});

const notificationsAdapter = createEntityAdapter({});

const initialState = notificationsAdapter.upsertMany(notificationsAdapter.getInitialState(), []);


export const { selectAll: bedsList } = notificationsAdapter.getSelectors((state) => state.notificationPanel.beds);

const dataSlice = createSlice({
  name: 'notificationPanel/beds',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getBeds.fulfilled]: (state, action) => notificationsAdapter.addMany(state, action.payload)
  },
});

export default dataSlice.reducer;
