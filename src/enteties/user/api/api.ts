import { apiRequest } from '@/shared';
import { AuthResponse } from '../model/types';

/**
 * API-модуль для авторизации пользователей
 */
export const authApi = {
  /**
   * Авторизует пользователя
   * @param login - Логин
   * @param password - Пароль
   */
  login: async (
    login: string,
    password: string,
    projectId = import.meta.env.VITE_PROJECT_ID
  ): Promise<AuthResponse> => {
    return await apiRequest<AuthResponse>({
      endpoint: '/auth/login',
      method: 'POST',
      body: { login, password, projectId },
    });
  },

  /**
   * Получает данные пользователя по ID
   * @param userId - ID пользователя
   */
  getUser: async (userId: string): Promise<AuthResponse> => {
    return await apiRequest<AuthResponse>({
      endpoint: `/admin/users/${userId}`,
      method: 'GET',
      body: null,
    });
  },
};
