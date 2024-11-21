import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Product = lazy(() => import('./product/Product'));
const Products = lazy(() => import('./products/Products'));
//const Order = lazy(() => import('./order/Order'));
//const Orders = lazy(() => import('./orders/Orders'));

const ReportsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'reports',
      element: <Products />,
    },
    {
      path: 'reports/:productId/*',
      element: <Product />,
    }
  ],
};

export default ReportsAppConfig;
