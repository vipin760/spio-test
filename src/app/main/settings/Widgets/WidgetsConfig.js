import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
 
const Product = lazy(() => import('./Product/Product'))
 
const WidgetsConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'widgets',
      element: <Product />,
    },
  ],
}
 
export default WidgetsConfig