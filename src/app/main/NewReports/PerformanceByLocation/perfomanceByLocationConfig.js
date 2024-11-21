import { lazy } from 'react';

const Products = lazy(() => import('./products/products'))

const PerformanceByLocationConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'performance_by_location',
      element: <Products />,
    },
  ],
}

export default PerformanceByLocationConfig



