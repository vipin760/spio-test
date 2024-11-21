import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Product from './Product/Product'

const AnalyticDashboardPage = lazy(()=>import('./Product/AnalyticsDashboard'));
// const Product = lazy(() => import('./Product/Product'))
// const Products = lazy(() => import('./products/Products'))

const AnalyticsConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'analytics',
      element: <AnalyticDashboardPage />,
    },
    // {
    //   path: 'review link',
    //   element: <Product />,
    // },
  ],
}

export default AnalyticsConfig



