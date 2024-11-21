import { combineReducers } from "@reduxjs/toolkit";
import dialog from "./dialogSlice";
import message from "./messageSlice";
import navbar from "./navbarSlice";
import navigation from "./navigationSlice";
import settings from "./settingsSlice";
import reviews from "./reviewSlice";
import getReviews from "./getReviewSlice";
import getEmails from "./getEmailSlice";
import getCustom from "./customSlice";
import selectLocation from "./selectedlocationSlice";
import googleintegration from "./integrationSlice";

const fuseReducers = combineReducers({
  navigation,
  settings,
  navbar,
  message,
  dialog,
  reviews,
  getReviews,
  getEmails,
  getCustom,
  selectLocation,
  googleintegration
});

export default fuseReducers;
