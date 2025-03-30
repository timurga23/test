import { createBrowserRouter } from 'react-router-dom';

import { BalancePage } from './balance/ui/page';
import { BuyoutsPage } from './buyout/ui/page';
import { CardsPage } from './cards/ui/page';
import { CargosPage } from './cargo/ui/page';
import { ClientsPage } from './clients/ui/page';
import { EmployersPage } from './employers';
import { LoginPage } from './login';
import { OperationCardsPage } from './operation-cards/ui/page';
import { OrdersPage } from './order/ui/page';
import { PositionsPage } from './positions/ui/page';
import { RatePage } from './rate/ui/page';
import { WelcomePage } from './welcome';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />,
  },
  {
    path: '/positions',
    element: <PositionsPage />,
  },
  {
    path: '/employers',
    element: <EmployersPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/cards',
    element: <CardsPage />,
  },
  {
    path: '/balance',
    element: <BalancePage />,
  },
  {
    path: '/rate',
    element: <RatePage />,
  },
  {
    path: '/operation-cards',
    element: <OperationCardsPage />,
  },
  {
    path: '/clients',
    element: <ClientsPage />,
  },
  {
    path: '/orders',
    element: <OrdersPage />,
  },
  {
    path: '/cargos',
    element: <CargosPage />,
  },
  {
    path: '/buyouts',
    element: <BuyoutsPage />,
  },
]);
