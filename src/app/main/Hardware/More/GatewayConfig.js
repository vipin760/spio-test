import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Products = lazy(() => import('./product/Product'))

const GatewayAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'gateways',
      element: <Products />,
    },
    
  ],
}

export default GatewayAppConfig
