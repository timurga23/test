import { router } from '@/pages/router';
import { useAuth } from '@/shared';
import { LoginModal, NavbarSegmented } from '@/widgets';
import { Flex } from '@mantine/core';
import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';

export const AuthGuard: FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Flex wrap={'nowrap'}>
      <NavbarSegmented />
      <RouterProvider router={router} />
    </Flex>
  ) : (
    <LoginModal />
  );
};
