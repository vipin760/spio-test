import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { addOrganiozation, removeContact, removeOrganization, updateContact, updateOrganization } from './organizationSlice';
import { API } from 'aws-amplify';

export const getOrganizations = createAsyncThunk(
  'organizationsApp/organizations/getOrganizations',
  async (params, { getState }) => {
    const query=`query MyQuery {
      getOrg {
        address {
          address_line1
          address_line2
          city
          country
          state
          zip_code
        }
        _id
        category
        email
        status
        name
        website
        contacts {
          contact
          name
          tag
          iso
        }
      }
    }
    `
    let result=null;
    try {
      const response = await API.graphql({
          query: query,
      })
      console.log("resp",response?.data?.getOrg)
      result= response?.data?.getOrg;
       result = result.map(function(item) {
        return { ...item,id : item._id}
    })
  } catch (error) {
      console.log('service history ERROR', error)
  }
    //const response1 = await axios.get('/api/contacts');
    

    const data = await result;

    return { data };
  }
);

const organizationsAdapter = createEntityAdapter({});

export const selectSearchText = ({ organizationsApp }) => organizationsApp?.organizations?.searchText;

export const { selectAll: selectOrganizations, selectById: selectOrganizationsById } =
  organizationsAdapter.getSelectors((state) => state.organizationsApp.organizations);

export const selectFilteredOrganizations = createSelector(
  [selectOrganizations, selectSearchText],
  (organizations, searchText) => {
    if (searchText.length === 0) {
      return organizations;
    }
    return FuseUtils.filterArrayByString(organizations, searchText);
  }
);

export const selectGroupedFilteredOrganizations = createSelector(
  [selectFilteredOrganizations],
  (organizations) => {
    return organizations
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

const organizationsSlice = createSlice({
  name: 'organizationsApp/organizations',
  initialState: organizationsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setOrganizationsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [updateOrganization.fulfilled]: organizationsAdapter.upsertOne,
    [addOrganiozation.fulfilled]: organizationsAdapter.addOne,
    [removeOrganization.fulfilled]: (state, action) => organizationsAdapter.removeOne(state, action.payload),
    [getOrganizations.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      organizationsAdapter.setAll(state, data);
      state.searchText = '';
    },
  },
});

export const { setOrganizationsSearchText } = organizationsSlice.actions;

export default organizationsSlice.reducer;
