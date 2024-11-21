import { lazy } from 'react';

const Products = lazy(() => import('./products/products'))

const ReviewDistributionByEmployeeConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'reviews_distribution_by_employee',
      element: <Products />,
    },
  ],
}

export default ReviewDistributionByEmployeeConfig;



