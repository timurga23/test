import { useMutation } from '@tanstack/react-query';
import { authApi } from './api';
import { AuthResponse } from '../model/types';

interface LoginCredentials {
  login: string;
  password: string;
  projectId?: string;
}

export const useLoginMutation = () => {
  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: ({ login, password, projectId }) => {
      return authApi.login(login, password, projectId);
    },
  });
};

export const useGetUserMutation = () => {
  return useMutation<AuthResponse, Error, string>({
    mutationFn: (userId: string) => {
      return authApi.getUser(userId);
    },
  });
};
