import { lazy } from 'react';

const Products = lazy(() => import('./products/products'))

const ReviewNPSByLocationConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'reviews_nps_by_location',
      element: <Products />,
    },
  ],
}

export default ReviewNPSByLocationConfig;



