import { lazy } from 'react';

const Products = lazy(() => import('./products/products.js'))

const ResponsiveTimeDistributionConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'response_time_distribution',
      element: <Products />,
    },
  ],
}

export default ResponsiveTimeDistributionConfig;



