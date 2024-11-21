import { combineReducers } from '@reduxjs/toolkit'
import product from './productSlice'
import products from './productsSlice'
import branches from './institutionBranchesSlice'
const reducer = combineReducers({
  products,
  product,
  branches
})

export default reducer
