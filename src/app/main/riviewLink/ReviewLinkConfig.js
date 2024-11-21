import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Product = lazy(() => import('./Product/Product'))
// const Products = lazy(() => import('./products/Products'))

const ReviewLinkConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'review_link',
      element: <Product />,
    },

   
    // {
    //   path: 'review link',
    //   element: <Product />,
    // },
  ],
}

export default ReviewLinkConfig



