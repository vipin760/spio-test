import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Product = lazy(() => import('./product/Product'));
const Products = lazy(() => import('./products/Products'));
//const Order = lazy(() => import('./order/Order'));
//const Orders = lazy(() => import('./orders/Orders'));

const BranchesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/e-commerce/products',
      element: <Products />,
    },
    {
      path: 'apps/e-commerce/products/:productId/*',
      element: <Product />,
    },
    {
      path: 'apps/e-commerce',
      element: <Navigate to="products" />,
    },
  ],
};

export default BranchesAppConfig;
