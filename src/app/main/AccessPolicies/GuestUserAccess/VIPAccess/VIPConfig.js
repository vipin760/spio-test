import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Product = lazy(() => import('./product/Product'))
const Products = lazy(() => import('./products/Products'))
const VIPAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'vip_access',
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

export default VIPAppConfig
