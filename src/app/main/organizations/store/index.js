import { combineReducers } from '@reduxjs/toolkit';
import tags from './tagsSlice';
import organizations from './organizationsSlice';
import countries from './countriesSlice';
import organization from './organizationSlice';

const reducer = combineReducers({
  tags,
  countries,
  organizations,
  organization,
});

export default reducer;
