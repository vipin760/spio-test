import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Product = lazy(() => import('./Product/Product'))
// const Products = lazy(() => import('./products/Products'))

const DshConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'faceid_dashboard',
      element: <Product />,
    },
    // {
    //   path: 'review link',
    //   element: <Product />,
    // },
  ],
}

export default DshConfig



