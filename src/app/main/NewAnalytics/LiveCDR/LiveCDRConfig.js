import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Product from './product/product'
// const Product = lazy(() => import('./Product/Product'))
// const Products = lazy(() => import('./products/Products'))

const LiveCDRConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'live_cdr',
      element: <Product />,
    },
    // {
    //   path: 'review link',
    //   element: <Product />,
    // },
  ],
}

export default LiveCDRConfig



