import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { authRoles } from 'src/app/auth'
const Product = lazy(() => import('./product/Product'))
const Products = lazy(() => import('./products/Products'))
const InstitutionsAppConfig = {
  settings: {
    layout: {},
  },
  // auth: authRoles['Super Admin'],

  routes: [
    {
      path: 'institution',
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

export default InstitutionsAppConfig
