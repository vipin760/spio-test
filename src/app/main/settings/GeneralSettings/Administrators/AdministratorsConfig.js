import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Product = lazy(() => import('./product/Product'))
const Products = lazy(() => import('./products/Products'))
const AdministratorsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'administrators',
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

export default AdministratorsAppConfig