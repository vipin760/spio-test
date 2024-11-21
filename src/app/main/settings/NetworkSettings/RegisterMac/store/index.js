import { combineReducers } from '@reduxjs/toolkit'
import product from './productSlice'
import products from './productsSlice'
import branches from './branches'
import gateways from './gateways'
import surfingPolicies from './surfingPoliciesSlice'
import institutes from './institutesSlice'

const reducer = combineReducers({
  products,
  product,
  branches,
  gateways,
  surfingPolicies,
  institutes
})

export default reducer
