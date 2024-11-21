import './api/auth-api';
import './api/notifications-api';
import './api/contacts-api';
import './api/countries-api';
import './api/ecommerce-api';
import './api/dashboards/project-api';
import history from '@history';
import mock from './mock';

mock.onAny().passThrough();

if (module?.hot?.status() === 'apply') {
  const { pathname } = history.location;
  history.push('/loading');
  history.push({ pathname });
}
