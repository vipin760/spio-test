import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Product = lazy(() => import('./product/Product'))
const Products = lazy(() => import('./products/Products'))
const RegisterAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'register_mac',
      element: <Products />,
      children: [
        {
          path: ':id',
          element: <Product />,
        },
       
      ],
    }
  ],
}

export default RegisterAppConfig
