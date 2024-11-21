import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
const Product = lazy(() => import('./product/product'));
const Products = lazy(() => import('./products/products'));
const DidMasterConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'did_master',
      element: <Products />,
      children: [
        {
          path: ':id',
          element: <Product />,
        },
       
      ],
    }
  ],
}

export default DidMasterConfig
