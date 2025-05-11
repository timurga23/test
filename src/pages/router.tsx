import { createBrowserRouter } from 'react-router-dom';

import { BASE_PAGES } from '.';
import { DashbordPage } from './dashboard';
import { WelcomePage } from './welcome';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />,
  },
  {
    path: '/dashboard',
    element: <DashbordPage />
  },
  ...BASE_PAGES,
]);
