import { router } from '@/pages/router';
import { useAuth } from '@/shared/lib/context/auth';
import { LoginModal } from '@/widgets/loginModal/ui/loginModal';
import { NavbarSegmented } from '@/widgets/menu/ui/menu';
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
