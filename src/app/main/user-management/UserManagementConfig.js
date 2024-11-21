import { lazy } from 'react';
import UserView from './user/UserView';
import UserForm from './user/UserForm';

const UsersApp = lazy(() => import('./UserManagement'));

const UsersAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'users',
      element: <UsersApp />,
      children: [
        {
          path: ':id',
          element: <UserView />,
        },
        {
          path: ':id/edit',
          element: <UserForm />,
        },
      ],
    },
  ],
};

export default UsersAppConfig;
