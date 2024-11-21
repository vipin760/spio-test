import { lazy } from 'react'
const Product = lazy(() => import('./product/Product'))
const Products = lazy(() => import('./products/Products'))
const GatewayConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'gateways_settings',
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

export default GatewayConfig
