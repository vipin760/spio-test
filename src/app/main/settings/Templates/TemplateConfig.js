import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Product = lazy(() => import('./Product/Product'))
// const Products = lazy(() => import('./products/Products'))

const TemplateConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'templates',
      element: <Product />,
    },
    // {
    //   path: 'review link',
    //   element: <Product />,
    // },
  ],
}

export default TemplateConfig



