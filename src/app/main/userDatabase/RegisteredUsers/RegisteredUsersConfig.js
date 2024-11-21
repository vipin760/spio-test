import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Product = lazy(() => import('./product/Product'))
const Products = lazy(() => import('./products/Products'))
const RegisteredUsersAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'registered_users',
      element: <Products />,
      children: [
        {
          path: ':id',
          element: <Product />,
        },
       
      ],
    },
  ],
  // routes: [
  //   {
  //     path: 'registered_users',
  //     element: <Products />,
  //   },
  //   {
  //     path: 'registered_users/:productId/*',
  //     element: <Product />,
  //   },
  // ],
}

export default RegisteredUsersAppConfig
