import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Product = lazy(() => import('./product/Product'))

const MonitoringAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'monitoring',
      element: <Product />,
    },
  ],
}

export default MonitoringAppConfig
