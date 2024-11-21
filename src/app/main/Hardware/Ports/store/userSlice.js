import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '@history';
import UserModel from '../model/UserModel';
import { API, Auth } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';

export const getContact = createAsyncThunk(
  'contactsApp/task/getUser',
  async (id, { dispatch, getState }) => {
    try {
      const query = `query getUser($id: ID!) {
        getUser(id: $id) {
          _id
          dob
          first_name
          last_name
          org_id
          role
          state
          title
          emails {
            email
            name
            tag
          }
          org {
            name
          }
          address {
            address_line1
            address_line2
            city
            country
            state
            zip_code
          }
          contacts {
            contact
            iso
            name
            tag
          }
        }
      }`;

      const res = await API.graphql({
        query: query,
        variables: { id: id },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      let data = {}
      if (res.data.getUser) {
        const { _id, first_name, last_name, address, role,org } = res.data.getUser;
        data = { ...res.data.getUser, id: _id, roles: [role], name: `${first_name} ${last_name}`, address: `${address.address_line1} ${address.address_line2 || ''} ${address.city || ''} ${address.state || ''} ${address.zip_code || ''} ${address.country || ''}`,organization:org?.name };
      }

      return data;
    } catch (error) {
      console.log(error);
      history.push({ pathname: `/apps/contacts` });

      return null;
    }
  }
);

export const addUser = createAsyncThunk(
  'contactsApp/contacts/addContact',
  async (user, { dispatch, getState }) => {
    console.log(user, 'insert');
    const { name, address, emails, contacts, title, birthday, roles ,id} = user;
    const createMutation = `mutation createUser($id: ID,$user: InputUser!) {
      createUser(id:$id,user: $user) {
        _id
        dob
        first_name
        last_name
        org_id
        role
        state
        title
        emails {
          email
          name
          tag
        }
        address {
          address_line1
          address_line2
          city
          country
          state
          zip_code
        }
        contacts {
          contact
          iso
          name
          tag
        }
      }
    }`;

    const [first_name, ...last_name] = name?.split(" ");
    const lname = last_name?.join(' ');
    // const cons = contacts?.map(c => {
    //   const { country, phoneNumber, label } = c;
    //   return { iso: country, tag: label, contact: phoneNumber };
    // })

    const userData = await Auth.currentAuthenticatedUser();

    console.log("userData",userData,contacts);

    const params = {
      emails: emails.map(e => ({ email: e.email, tag: e.label })),
      contacts: contacts,
      address: { address_line1: address },
      first_name: first_name,
      last_name: lname,
      org_id: userData.attributes['custom:org_id'],
      role: roles[0],
      state: "ACTIVE",
      dob: birthday,
      title: title
    }

    console.log('params', params);
    let inputParams={ user: params }
    if(id){
      inputParams={id:id, user: params }
    }

    const res = await API.graphql({
      query: createMutation,
      variables: inputParams,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });
    console.log('res', res);
    let data = {}
    if (res.data.createUser) {
      const { _id, first_name, last_name, address } = res.data.createUser;
      data = { ...res.data.createUser, id: _id, name: `${first_name} ${last_name}`, address: `${address.address_line1} ${address.address_line2 || ''} ${address.city || ''} ${address.state || ''} ${address.zip_code || ''} ${address.country || ''}` };
    }
    console.log(data, 'resp');
    return data;
  }
);

export const updateContact = createAsyncThunk(
  'contactsApp/contacts/updateContact',
  async (contact, { dispatch, getState }) => {
    const response = await axios.put(`/api/contacts/${contact.id}`, contact);

    const data = await response.data;

    return data;
  }
);

export const removeContact = createAsyncThunk(
  'contactsApp/contacts/removeContact',
  async (id, { dispatch, getState }) => {
    const response = await axios.delete(`/api/contacts/${id}`);

    await response.data;

    return id;
  }
);

export const selectContact = ({ contactsApp }) => contactsApp.contact;

const userSlice = createSlice({
  name: 'contactsApp/contact',
  initialState: null,
  reducers: {
    newUser: (state, action) => UserModel(),
    resetContact: () => null,
  },
  extraReducers: {
    [getContact.pending]: (state, action) => null,
    [getContact.fulfilled]: (state, action) => action.payload,
    [updateContact.fulfilled]: (state, action) => action.payload,
    [removeContact.fulfilled]: (state, action) => null,
  },
});

export const { resetContact, newUser } = userSlice.actions;

export default userSlice.reducer;
