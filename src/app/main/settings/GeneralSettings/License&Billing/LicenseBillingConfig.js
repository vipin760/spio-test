import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Product = lazy(() => import('./product/Product'))
const Products = lazy(() => import('./products/Products'))
const LicenseAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'billing_details',
      element: <Product />,
    },
    {
      path: 'license_billing/:productId/*',
      element: <Product />,
    },
  ],
}

export default LicenseAppConfig
