import { lazy } from 'react';
import ContactView from './contact/ContactView';
import ContactForm from './contact/ContactForm';

const OrganizationsApp = lazy(() => import('./UserManagement'));

const OrganizationAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  // auth: ['full_access'],
  routes: [
    {
      path: 'organizations',
      element: <OrganizationsApp />,
      children: [
        {
          path: ':id',
          element: <ContactView />,
        },
        {
          path: ':id/edit',
          element: <ContactForm />,
        },
      ],
    },
  ],
};

export default OrganizationAppConfig;
