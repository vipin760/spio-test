import { combineReducers } from '@reduxjs/toolkit';
import tags from './tagsSlice';
import contacts from './usersSlice';
import countries from './countriesSlice';
import contact from './userSlice';

const reducer = combineReducers({
  tags,
  countries,
  contacts,
  contact,
});

export default reducer;
