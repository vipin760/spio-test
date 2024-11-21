import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Product = lazy(() => import('./product/Product'))
const Products = lazy(() => import('./products/Products'))
const WebFilterAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'web_filters',
      element: <Products />,
    },
    {
      path: 'web_filters/:productId/*',
      element: <Product />,
    },
  ],
}

export default WebFilterAppConfig
