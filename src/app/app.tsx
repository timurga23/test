import { FC } from 'react';

import { AuthProvider } from '@/shared/auth/AuthContext';
import { AuthGuard } from '@/widgets';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export const App: FC = () => {
  return (
    <MantineProvider theme={theme}>
      <AuthProvider>
        <AuthGuard />
      </AuthProvider>
    </MantineProvider>
  );
};
