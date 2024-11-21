import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Product = lazy(() => import('./product/product'))
const Products = lazy(() => import('./products/products'))
const IPNavConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'IP',
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

export default IPNavConfig
