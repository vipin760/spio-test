import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Product = lazy(() => import('./product/Product'))
const Products = lazy(() => import('./products/Products'))
const ReservedClientsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'reserved_clients',
      element: <Products />,
    },
    {
      path: 'reserved_clients/:productId/*',
      element: <Product />,
    },
  ],
}

export default ReservedClientsAppConfig
