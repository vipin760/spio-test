import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTags = createAsyncThunk(
  'contactsApp/tags/getTags',
  async (params, { getState }) => {

    const roles = [
      {
        id: 'full_access',
        title: 'Full Access - (Read, Update, Write, Delete)'
      },
      {
        id: 'read_only',
        title: 'Read Only - (Read)'
      },
      {
        id: 'read_write',
        title: 'Read Write - (Read, Update, Write)'
      }
    ]

    return roles;
  }
);

const tagsAdapter = createEntityAdapter({});

export const { selectAll: selectTags, selectById: selectTagsById } = tagsAdapter.getSelectors(
  (state) => state.contactsApp.tags
);

const tagsSlice = createSlice({
  name: 'contactsApp/tags',
  initialState: tagsAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getTags.fulfilled]: tagsAdapter.setAll,
  },
});

export default tagsSlice.reducer;
