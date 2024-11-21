import { lazy } from 'react'
 
const Product = lazy(() => import('./Product/product'));
 
const WifiIntegrationConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'wifi-integration',
      element: <Product />,
    },
  ],
}
 
export default WifiIntegrationConfig