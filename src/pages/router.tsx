import { createBrowserRouter } from 'react-router-dom';

import { BASE_PAGES } from '.';
import { WelcomePage } from './welcome';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />,
  },
  ...BASE_PAGES,
]);
