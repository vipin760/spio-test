import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
const Product = lazy(() => import('./product/product'));
const Products = lazy(() => import('./products/products'));
const VirtualNoMappingConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'virtual_no_mapping',
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

export default VirtualNoMappingConfig
