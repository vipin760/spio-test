import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Product = lazy(() => import('./product/Product'));
const Products = lazy(() => import('./products/Products'));
//const Order = lazy(() => import('./order/Order'));
//const Orders = lazy(() => import('./orders/Orders'));

const RoomsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'rooms',
      element: <Products />,
    },
    {
      path: 'rooms/:productId/*',
      element: <Product />,
    }
  ],
};

export default RoomsAppConfig;
