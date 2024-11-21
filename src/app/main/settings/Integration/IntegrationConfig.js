import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
 
const Product = lazy(() => import('./Product/Product'))
 
const IntegrationConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'integration',
      element: <Product />,
    },
  ],
}
 
export default IntegrationConfig