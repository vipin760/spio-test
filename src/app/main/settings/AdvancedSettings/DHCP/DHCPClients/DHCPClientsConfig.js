import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Product = lazy(() => import('./product/Product'))
const Products = lazy(() => import('./products/Products'))
const DHCPClientsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'dhcp_clients',
      element: <Products />,
    },
    {
      path: 'dhcp_clients/:productId/*',
      element: <Product />,
    },
  ],
}

export default DHCPClientsAppConfig
