import { createBrowserRouter } from 'react-router-dom';

import { routes } from '@/shared';

import { EmployersPage } from './employers';
import { LoginPage } from './login';
import { PositionsPage } from './positions/ui/page';
import { WelcomePage } from './welcome';
import { CardsPage } from './cards/ui/page';
import { BalancePage } from './balance/ui/page';
import { RatePage } from './rate/ui/page';
import { OperationCardsPage } from './operation-cards/ui/page';

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
  {
    path: routes.BALANCE,
    element: <BalancePage />,
  },
  {
    path: routes.RATE,
    element: <RatePage />,
  },
  {
    path: routes.OPERATION_CARDS,
    element: <OperationCardsPage />,
  },
]);
