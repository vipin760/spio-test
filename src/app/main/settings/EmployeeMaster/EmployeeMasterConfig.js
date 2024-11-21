import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
const Product = lazy(() => import('./product/product'));
const Products = lazy(() => import('./products/products'));

const EmployeeMasterConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'employee_master',
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

export default EmployeeMasterConfig
