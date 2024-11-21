import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Account from './Account'

// const Product = lazy(() => import('./Product/Product'))
// const Products = lazy(() => import('./products/Products'))

const AccountConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'integration/account',
      element: <Account />,
    },
    // {
    //   path: 'review link',
    //   element: <Product />,
    // },
  ], 
}

export default AccountConfig