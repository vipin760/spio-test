import { combineReducers } from '@reduxjs/toolkit'
import product from './productSlice'
import products from './productsSlice'
import branches from './branches'
import gateways from './gateways'
import institutes from './institutesSlice'

const reducer = combineReducers({
  products,
  product,
  branches,
  gateways,
  institutes
})

export default reducer
