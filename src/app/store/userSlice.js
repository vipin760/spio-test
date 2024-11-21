/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import { setInitialSettings } from "app/store/fuse/settingsSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import settingsConfig from "app/configs/settingsConfig";
import jwtService from "../auth/services/jwtService";
import axios from 'axios';  

export const setUser = createAsyncThunk(
  "user/setUser",
  async (user, { dispatch, getState }) => {
    /*
    You can redirect the logged-in user to a specific route depending on his role
    */
    console.log("........", user);
    if (user.loginRedirectUrl) {
      settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example 'apps/academy'
    }

    return user;
  }
);
export const getGatewayStatus = createAsyncThunk(
  "gateway",
  async (_, thunkAPI) => {
    const { getState } = thunkAPI;
    const institutionGatewayId = getState()?.companies?.ids[0];
    const response = await axios.get(
      `dashBoard/dashBoardApis?institutionGatewayId=${institutionGatewayId}`
    );
    const data = response.data;
    return data === undefined ? null : data;
  }
);

export const updateUserSettings = createAsyncThunk(
  "user/updateSettings",
  async (settings, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = _.merge({}, user, { data: { settings } });

    dispatch(updateUserData(newUser));

    return newUser;
  }
);

export const updateUserGateWayDetails = createAsyncThunk(
  "user/updateGateway",
  async (gateWay, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = _.merge({}, user, { data: { gateWay } });

    dispatch(updateUserGatewayData(newUser));

    return newUser;
  }
);

export const updateUserShortcuts = createAsyncThunk(
  "user/updateShortucts",
  async (shortcuts, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts,
      },
    };

    dispatch(updateUserData(newUser));

    return newUser;
  }
);

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState();
  localStorage.clear()
  if (!user.role || user.role.length === 0) {
    // is guest
    return null;
  }

  history.push({
    pathname: "/",
  });

  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }

  jwtService
    .updateUserData(user)
    .then(() => {
      dispatch(showMessage({ message: "User data saved with api" }));
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.message }));
    });
};
export const updateUserGatewayData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }

  jwtService
    .updateUserGatewayData(user?.data?.gateWay)
    .then((res) => {
      const { user } = getState();
      const newUser = _.merge({}, user, { data: { gateWayDetails: res.data } });
      dispatch(setUser(newUser));
      // dispatch(showMessage({ message: 'User data saved with api' }));
    })
    .catch((error) => {
      if (error.message) {
        jwtService.logout();
      }
      //dispatch(showMessage({ message: error.message }));
    });
};

const initialState = {
  role: [], // guest

  data: {
    given_name: "John Doe",
    photoURL: "assets/images/avatars/brian-hughes.jpg",
    email: "johndoe@withinpixels.com",
    shortcuts: ["apps.calendar", "apps.mailbox", "apps.contacts", "apps.tasks"],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {
    [updateUserSettings.fulfilled]: (state, action) => action.payload,
    [updateUserShortcuts.fulfilled]: (state, action) => action.payload,
    [updateUserGateWayDetails.fulfilled]: (state, action) => action.payload,
    [setUser.fulfilled]: (state, action) => action.payload,
    [getGatewayStatus.fulfilled]: (state, action) => {
      state.data.gateWayDetails = action.payload;
    },
  },
});

export const { userLoggedOut } = userSlice.actions;

export const selectUser = ({ user }) => user;

export const selectUserShortcuts = ({ user }) => user.data.shortcuts;

export default userSlice.reducer;
