import { lazy } from 'react';

const Products = lazy(() => import('./products/products.js'))

const ResponsiveTimeOverTimeConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'responsive_time_over_time',
      element: <Products />,
    },
  ],
}

export default ResponsiveTimeOverTimeConfig;



