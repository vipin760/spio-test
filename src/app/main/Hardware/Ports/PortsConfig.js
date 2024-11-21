import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Product = lazy(() => import('./product/Product'))

const PortsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'ports',
      element: <Product />,
    },
  ],
}

export default PortsAppConfig
