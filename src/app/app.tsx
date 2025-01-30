import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/pages/router';
import { NavbarSegmented } from '@/widgets';
import { createTheme, Flex, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export const App: FC = () => {
  return (
    <MantineProvider theme={theme}>
      <Flex wrap={'nowrap'}>
        {/* Левое меню всегда отображается */}
        <NavbarSegmented />

        {/* Основной контент меняется в зависимости от маршрута */}
        <RouterProvider router={router} />
      </Flex>
    </MantineProvider>
  );
};
