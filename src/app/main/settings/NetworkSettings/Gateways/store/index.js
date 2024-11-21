import { combineReducers } from '@reduxjs/toolkit'
import product from './productSlice'
import products from './productsSlice'
import branches from './branches'
import gateways from './gateways'
import institutes from './institutesSlice'
import StatusSlice from './StatusSlice'
import secretKeySlice from './secretKeySlice'

const reducer = combineReducers({
  products,
  product,
  branches,
  gateways,
  institutes,
  StatusSlice,
  secretKeySlice
})

export default reducer
