import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import branches from './branchesSlice';
import product from './productSlice';
import products from './productsSlice';

const reducer = combineReducers({
  products,
  product,
  branches,
  order,
});

export default reducer;
