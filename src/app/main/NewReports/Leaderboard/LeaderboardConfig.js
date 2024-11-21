import { lazy } from 'react';

const Products = lazy(() => import('./products/products'))

const LeaderBoardConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'leaderboard',
      element: <Products />,
    },
  ],
}

export default LeaderBoardConfig



