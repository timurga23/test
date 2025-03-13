import { createBrowserRouter } from 'react-router-dom';

import { routes } from '@/shared';

import { EmployersPage } from './employers';
import { LoginPage } from './login';
import { PositionsPage } from './positions/ui/page';
import { WelcomePage } from './welcome';
import { CardsPage } from './cards/ui/page';

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
    path: routes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: routes.CARDS,
    element: <CardsPage />,
  },
]);
