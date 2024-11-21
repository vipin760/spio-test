import { lazy } from 'react';

const Products = lazy(() => import('./products/products'))

const ReportsAndRatingsConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'reviews&ratings',
      element: <Products />,
    },
  ],
}

export default ReportsAndRatingsConfig



