import { combineReducers } from '@reduxjs/toolkit'
import product from './productSlice'
import products from './productsSlice'
import widgets from './widgetsSlice'

const reducer = combineReducers({
  products,
  product,
  widgets,
})

export default reducer
