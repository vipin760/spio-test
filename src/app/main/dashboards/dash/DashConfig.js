import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Product = lazy(() => import('./Product/Product'))
// const Products = lazy(() => import('./products/Products'))

const DashConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'dash',
      element: <Product />,
    },
    // {
    //   path: 'review link',
    //   element: <Product />,
    // },
  ],
}

export default DashConfig



