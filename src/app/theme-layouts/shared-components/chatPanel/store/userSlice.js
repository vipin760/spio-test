import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import JwtService from "src/app/auth/services/jwtService";

export const getUserData = createAsyncThunk(
  "https://api.spiolabs.com/spiofy/admin/updateUser",
  async () => {
    const response = await JwtService.post("admin/updateUser");

    const data = await response.data;
    console.log(data, "sai");
    return data;
  }
);

export const updateUserData = createAsyncThunk(
  "https://api.spiolabs.com/spiofy/admin/updateUser",
  async (newData) => {
    const response = await JwtService.post("admin/updateUser", newData);
    console.log(response, "kiran");
    const data = await response.data;
    console.log(data, "kiran");
    return data;
  }
);

const userSlice = createSlice({
  name: "chatPanel/user",
  initialState: null,
  extraReducers: {
    [getUserData.fulfilled]: (state, action) => action.payload,
    [updateUserData.fulfilled]: (state, action) => action.payload,
  },
});

export const { updateUserChatList } = userSlice.actions;

export const selectUser = ({ chatPanel }) => chatPanel.user;

export default userSlice.reducer;
