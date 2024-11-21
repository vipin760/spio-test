import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '@history';
import OrganizationModel from '../model/OrganizationModel';
import { API } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql/lib/types'

export const getOrganization = createAsyncThunk(
  'organizationsApp/task/getOrganization',
  async (id, { dispatch, getState }) => {
    try {
      const query = `query MyQuery {
        getOrg(id:"${id}") {
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
      }`
      //const response = await axios.get(`/api/contacts/${id}`);const data = await response.data;
      let result = null;
      try {
        const response = await API.graphql({
          query: query,
        })

        result = response?.data?.getOrg;
        result = { ...result[0], id: result[0]?._id }
        console.log("resp getOrg", result)
      } catch (error) {
        console.log('getOrg ERROR', error)
      }
      const data = await result;
      return data;

    } catch (error) {
      history.push({ pathname: `/organizations` });

      return null;
    }
  }
);

export const addOrganiozation = createAsyncThunk(
  'organizationsApp/organizations/addOrganization',

  async (inputData, { dispatch, getState }) => {
    const query = `mutation ($input:  OrgInput) {
      createOrg(org: $input) {
        _id
        address {
          address_line1
          address_line2
          city
          country
          state
          zip_code
        }
        email
        name
        status
        website
        category
        }
      }`

    try {
      const response = await API.graphql({
        query: query,
        variables: { input: inputData },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
      return response?.data?.createOrg
    } catch (error) {
      console.log('createOrg', error)
    }
    //const response = await axios.post('/api/contacts', contact);

    let data = await response;
    data = { ...data, id: data?.id }

    return data;
  }
);

export const updateOrganization = createAsyncThunk(
  'organizationsApp/organization/updateOrganization',
  async (contact, { dispatch, getState }) => {
    // const response = await axios.put(`/api/contacts/${contact.id}`, contact);

    // const data = await response.data;
    const query = `mutation ($input:  OrgInput) {
      createOrg(org: $input) {
        _id
        address {
          address_line1
          address_line2
          city
          country
          state
          zip_code
        }
        email
        name
        status
        website
        category
        }
      }`
    let params = contact;
    delete params.id;
    console.log('inputData', contact)
    try {
      const response = await API.graphql({
        query: query,
        variables: { input: params },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
      return response?.data?.createOrg
    } catch (error) {
      console.log('updateOrg', error)
    }
    //const response = await axios.post('/api/contacts', contact);

    let data = await response;
    data = { ...data, id: data?._id }


    return data;
  }
);

export const removeOrganization = createAsyncThunk(
  'organizationsApp/organization/removeOrganization',
  async (id, { dispatch, getState }) => {
    const response = await axios.delete(`/api/contacts/${id}`);

    await response.data;

    return id;
  }
);

export const selectOrganization = ({ organizationsApp }) => organizationsApp?.organization;

const organizationSlice = createSlice({
  name: 'organizationsApp/organization',
  initialState: null,
  reducers: {
    newOrganization: (state, action) => OrganizationModel(),
    resetOrganization: () => null,
  },
  extraReducers: {
    [getOrganization.pending]: (state, action) => null,
    [getOrganization.fulfilled]: (state, action) => action.payload,
    [updateOrganization.fulfilled]: (state, action) => action.payload,
    [removeOrganization.fulfilled]: (state, action) => null,
  },
});

export const { resetOrganization, newOrganization } = organizationSlice.actions;

export default organizationSlice.reducer;
