import { FC } from 'react';

import { AuthGuard } from '@/widgets';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/shared';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const queryClient = new QueryClient();

export const App: FC = () => {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthGuard />
          <ToastContainer />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
