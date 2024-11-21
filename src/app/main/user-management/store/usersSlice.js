import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { addUser, removeContact, updateContact } from "./userSlice";
import JwtService from "src/app/auth/services/jwtService";
// import { API } from 'aws-amplify';
// import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';

export const getUsers = createAsyncThunk(
  "https://api.spiolabs.com/spiofy/admin/getAllAdminUsers?page=0&size=10",
  async (params, { getState }) => {
    console.log("loading...", getState());
    const query = `query getUsers {
      getUsers {
        _userId
        userProfileName
        userLoginPassword
        userType
        
      }
    }`;
    const header = {
      institutionMasterId: getState().user?.data?.institutionMasterId,
    };
    const res = await JwtService.post(
      `admin/getAllAdminUsers?page=0&size=10`,
      header
    );
    console.log(res, "sai");
    let data = [];
    if (res.data.content) {
      console.log(res.data.content, "kiran");
      data = res.data.content.map((u) => ({
        ...u,
        id: u.userId,
        name: `${u.userProfileName}`,
        password: `${u.userLoginPassword}`,
        userType: `${u.userType}`,
      }));
    }

    return { data };
  }
);

const usersAdapter = createEntityAdapter({});

export const selectSearchText = ({ contactsApp }) =>
  contactsApp.contacts.searchText;

export const { selectAll: selectContacts, selectById: selectContactsById } =
  usersAdapter.getSelectors((state) => state.contactsApp.contacts);

export const selectFilteredContacts = createSelector(
  [selectContacts, selectSearchText],
  (users, searchText) => {
    if (searchText.length === 0) {
      return users;
    }
    return FuseUtils.filterArrayByString(users, searchText);
  }
);

export const selectGroupedFilteredContacts = createSelector(
  [selectFilteredContacts],
  (users) => {
    return users
      ?.sort((a, b) =>
        a?.name?.localeCompare(b.name, "es", { sensitivity: "base" })
      )
      ?.reduce((r, e) => {
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

const userSlice = createSlice({
  name: "contactsApp/contacts",
  initialState: usersAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setContactsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [updateContact.fulfilled]: usersAdapter.upsertOne,
    [addUser.fulfilled]: usersAdapter.addOne,
    [removeContact.fulfilled]: (state, action) =>
      usersAdapter.removeOne(state, action.payload),
    [getUsers.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      usersAdapter.setAll(state, data);
      state.searchText = "";
    },
  },
});

export const { setContactsSearchText } = userSlice.actions;

export default userSlice.reducer;
