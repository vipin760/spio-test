import { combineReducers } from '@reduxjs/toolkit'
import product from './productSlice'
import products from './productsSlice'
import institutes from './institutesSlice'
import branches from './branches'
import gateways from './gateways'
const reducer = combineReducers({
  products,
  product,
  institutes,
  branches,
  gateways
})

export default reducer
