import { lazy } from 'react'
const Product = lazy(() => import('./product/Product'))
const Products = lazy(() => import('./products/Products'))
const SurfingPoliciesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'surfing_policies',
      element: <Products />,
      children: [
        {
          path: ':id',
          element: <Product />,
        },
       
      ],
    },
  ],
}

export default SurfingPoliciesAppConfig
