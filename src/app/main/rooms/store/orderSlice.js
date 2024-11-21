import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrder = createAsyncThunk('bedsApp/order/getOrder', async (orderId) => {
  const response = await axios.get(`/api/ecommerce/orders/${orderId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const saveOrder = createAsyncThunk('bedsApp/order/saveOrder', async (order) => {
  const response = await axios.put('/api/ecommerce/orders', order);
  const data = await response.data;

  return data;
});

const orderSlice = createSlice({
  name: 'bedsApp/order',
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [getOrder.fulfilled]: (state, action) => action.payload,
    [saveOrder.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectOrder = ({ bedsApp }) => bedsApp.order;

export default orderSlice.reducer;
