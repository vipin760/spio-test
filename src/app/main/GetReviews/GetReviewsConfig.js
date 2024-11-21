import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import GetReview from './getreviews';
// import Product from './ProductTab';

const Product = lazy(() => import('./ProductTab'));
//const Order = lazy(() => import('./order/Order'));
//const Orders = lazy(() => import('./orders/Orders'));

const GetReviewsConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'reviews',
      element: <Product />,
    }
  ],
};

export default GetReviewsConfig;
