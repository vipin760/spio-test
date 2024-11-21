import { lazy } from 'react';

const Products = lazy(() => import('./products/products.js'))

const ResponseRateByCityConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'response_rate_by_city',
      element: <Products />,
    },
  ],
}

export default ResponseRateByCityConfig;



