import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Product = lazy(() => import('./product/Product'))
const Products = lazy(() => import('./products/Products'))
const TemporaryUsersAppConfig = {
  settings: {
    layout: {},
  },
   routes: [
    {
      path: 'temporary_users',
      element: <Products />,
      children: [
        {
          path: ':id',
          element: <Product />,
        },
       
      ],
    },
  ],
}

export default TemporaryUsersAppConfig
