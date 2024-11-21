import { lazy } from 'react';

const Products = lazy(() => import('./products/products'))

const LocationWiseGraphConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'location_wise_graph',
      element: <Products />,
    },
  ],
}

export default LocationWiseGraphConfig



