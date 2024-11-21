import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Product = lazy(() => import('./product/Product'))

const LocalInformationAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'account_information',
      element: <Product />,
    },
  ],
}

export default LocalInformationAppConfig
