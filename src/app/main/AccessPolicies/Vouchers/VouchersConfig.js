import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Product = lazy(() => import('./product/Product'))
const Products = lazy(() => import('./products/Products'))
const VouchersAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'vouchers',
      element: <Products />,
    },
    {
      path: 'vouchers/:productId/*',
      element: <Product />,
    },
  ],
}

export default VouchersAppConfig
