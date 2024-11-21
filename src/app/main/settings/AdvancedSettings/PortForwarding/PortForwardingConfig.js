import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Product = lazy(() => import('./product/Product'))
const Products = lazy(() => import('./products/Products'))
const PortForwardingAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'port_forwarding',
      element: <Products />,
    },
    {
      path: 'port_forwarding/:productId/*',
      element: <Product />,
    },
  ],
}

export default PortForwardingAppConfig
