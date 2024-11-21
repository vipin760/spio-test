import { combineReducers } from '@reduxjs/toolkit'
import product from './productSlice'
import products from './productsSlice';
import surfingPolicies from './surfingPoliciesSlice'
import wifiUsers from './wifiUsersSlice'

const reducer = combineReducers({
  products,
  product,
  surfingPolicies,
  wifiUsers
})

export default reducer
