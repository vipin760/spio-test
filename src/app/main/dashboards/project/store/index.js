import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectsSlice';
import widgets from './widgetsSlice';
import contacts from './bedsSlice';
import BedAlarms from './bedAlarmsSlice';
import organizations from './organizationsSlice';

const reducer = combineReducers({
  widgets,
  projects,
  contacts,
  BedAlarms,
  organizations
});

export default reducer;
