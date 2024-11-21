import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { API } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';

export const getBeds = createAsyncThunk(
  'projectDashboardApp/contacts/getContacts',
  async (params, { getState }) => {

    const bedsQuery = `query getBeds($org_id: ID) {
      getBeds(org_id:$org_id) {
        _id
        branch_id
        device_id
        floor_id
        name
        org_id
        status
        initial_pressure
        settings{
          absent {
            danger
            minutes
            status
            timeSlots {
              endTime
              startTime
            }
          }
          roll {
            roll
            status
          }
          ulcer {
            danger
            duration
            pressureLevel
            status
            warning
          }
        }
        floor {
          _id
          floor
          name
          no_of_rooms
          status
        }
        room {
          _id
          floor_id
          status
          no_of_beds
          name
        }
        room_id
        branch {
          _id
          branch_name
          address{
            address_line1
          }
        }
      }
    }`;

    const res = await API.graphql({
      query: bedsQuery,
      variables: params,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });
    let data = []
    if (res.data.getBeds) {
      data = res.data.getBeds.map(b => ({
        ...b,
        id: b._id
      }));
    }
    data = data.filter(d => d.device_id)
    return { data };
  }
);


export const calibirateBed = createAsyncThunk(
  'projectDashboardApp/contacts/addBedSettings',
  async (bed, { dispatch, getState }) => {
    const query = `mutation calibirate($bed_id: ID!, $patient: ID) {
      calibirateBed(bed_id: $bed_id, patient: $patient) {
        _id
        branch_id
        device_id
        floor_id
        initial_pressure
        name
        org_id
        room_id
        status
        branch {
          _id
          branch_name
          floors {
            floor
          }
          rooms {
            name
          }
        }
      }
    }
    `
    let result = null;
    console.log("payload calibirate", bed);
    try {
      const response = await API.graphql({
        query: query,
        variables: { bed_id: bed.id, patient: bed.patient },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
      console.log("calibirate resp", response?.data?.calibirateBed)
      result = { ...bed, ...response?.data?.calibirateBed };
    } catch (error) {
      console.log('calibirate bed history ERROR', error)
    }

    // history.push({ pathname: `/beds` });
    const data = await result;
    dispatch(getBeds())
    return { ...data };
  }
);

export const updateBed = createAsyncThunk(
  'projectDashboardApp/contacts/updateContact',
  async (id, { dispatch, getState }) => {

    const updateMutation = `mutation updateBedStatus($bedId: ID!) {
      updateBedStatus(bed_id: $bedId) {
        _id
        name
        branch_id
        device_id
        floor_id
        initial_pressure
        org_id
        room_id
        status
      }
    }`;
    const res = await API.graphql({
      query: updateMutation,
      variables: { bedId: id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });
    let data = {};
    console.log('update resp', res);
    dispatch(getBeds());
    return { ...data };
  }
);


const contactsAdapter = createEntityAdapter({});

export const selectSearchText = ({ projectDashboardApp }) => projectDashboardApp?.contacts?.searchText;

export const { selectAll: selectContacts, selectById: selectContactsById } =
  contactsAdapter.getSelectors((state) => state?.projectDashboardApp?.contacts||null);

export const selectFilteredContacts = createSelector(
  [selectContacts, selectSearchText],
  (contacts, searchText) => {
    if (searchText.length === 0) {
      return contacts;
    }
    return FuseUtils.filterArrayByString(contacts, searchText);
  }
);

export const selectGroupedFilteredContacts = createSelector(
  [selectFilteredContacts],
  (contacts) => {
    return contacts
      .sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))
      .reduce((r, e) => {
        // get first letter of name of current element
        const group = e.name[0];
        // if there is no property in accumulator with this letter create it
        if (!r[group]) r[group] = { group, children: [e] };
        // if there is push current element to children array for that letter
        else r[group].children.push(e);
        // return accumulator
        return r;
      }, {});
  }
);



const contactsSlice = createSlice({
  name: 'projectDashboardApp/contacts',
  initialState: contactsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setContactsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [updateBed.fulfilled]: contactsAdapter.upsertOne,
    [getBeds.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      contactsAdapter.setAll(state, data);
      state.searchText = '';
    },
  },
});

export const { setContactsSearchText } = contactsSlice.actions;

export default contactsSlice.reducer;
