import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import AnalyticsDashboard from '../../Analytics/Product/AnalyticsDashboard'

const Product = lazy(() => import('./Product/Product'))
// const Products = lazy(() => import('./products/Products'))

const ConnectDshConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'connect_dashboard',
      element: <AnalyticsDashboard />,
    },
    // {
    //   path: 'review link',
    //   element: <Product />,
    // },
  ],
}

export default ConnectDshConfig



