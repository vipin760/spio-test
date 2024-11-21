import { lazy } from 'react';

const BedSheetPagePage = lazy(() => import('./BedSheetPage'));
import authRoles from '../../auth/authRoles';

const publicPagesConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'bs/:token',
      element: <BedSheetPagePage />
    },
  ],
};

export default publicPagesConfig;
