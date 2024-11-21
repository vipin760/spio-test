import { combineReducers } from '@reduxjs/toolkit';
import data from './dataSlice';
import state from './stateSlice';
import beds from "./alarms"

const reducer = combineReducers({
  data,
  state,
  beds
});
export default reducer;
