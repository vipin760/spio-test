import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';


export const getAlarms = createAsyncThunk(
  'projectDashboardApp/alarms/getAlarms',
  async (params, { getState }) => {

    const getAlarmsQuery = `query getBedAlarms($bedIds: [ID]!) {
      getBedsData(bed_ids: $bedIds) {
        absenceStatus
        ulCerStatus
        ulcerDuration
        missingSinceMins
        _id
        bed {
          _id
          name
          floor_id
          initial_pressure
          status
        }
        floor {
          name
        }
        branch {
          branch_name
        }
        room {
          name
        }
      }
    }
    `;

    let result = null;
    console.log("payload alarms", params);
    try {
      const response = await API.graphql({
        query: getAlarmsQuery,
        variables: { bedIds: params },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
      console.log("alarms resp", response?.data?.getBedsData)
      result = { ...response?.data?.getBedsData.map(itm => ({ ...itm, id: itm.bed._id })) };
    } catch (error) {
      console.log('alarms ERROR', error)
    }

    const data = await result;

    return data;
  }
);

const bedAlarmsAdapter = createEntityAdapter({});

export const { selectAll: selectAlarms, selectById: selectAlarmsById } = bedAlarmsAdapter.getSelectors(
  (state) => {
    console.log(state);
    return state.projectDashboardApp.BedAlarms
  }
);

const alarmsSlice = createSlice({
  name: 'projectDashboardApp/alarms',
  initialState: bedAlarmsAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getAlarms.fulfilled]: bedAlarmsAdapter.setAll,
  },
});

export default alarmsSlice.reducer;
