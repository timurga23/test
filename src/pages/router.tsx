import { createBrowserRouter } from 'react-router-dom';

import { routes } from '@/shared/routes';

import { EmployersPage } from './employers';
import { PositionsPage } from './positions/ui/page';
import { WelcomePage } from './welcome';
import { CustomerSpecPage } from './customer-spec';
import { LoginPage } from './login';

export const router = createBrowserRouter([
  {
    path: routes.WELCOME,
    element: <WelcomePage />,
  },
  {
    path: routes.POSITIONS,
    element: <PositionsPage />,
  },
  {
    path: routes.EMPLOYERS,
    element: <EmployersPage />,
  },
  {
    path: routes.CUSTOMER_SPEC,
    element: <CustomerSpecPage />,
  },
  {
    path: routes.LOGIN,
    element: <LoginPage />,
  },
]);
