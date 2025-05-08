import { router } from '@/pages/router';
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { routes } from '../../../model';
import { getAuthToken, removeAuthToken, saveAuthToken } from '../../auth-token';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    setIsAuthenticated(!!token);
    setIsInitialized(true);
  }, []);

  const login = (token: string) => {
    setIsAuthenticated(true);
    saveAuthToken(token);
    router.navigate(routes.WELCOME);
  };

  const logout = () => {
    setIsAuthenticated(false);
    removeAuthToken();
    router.navigate(routes.LOGIN);
  };

  if (!isInitialized) {
    return null; // или loading indicator
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth должен использоваться внутри AuthProvider');
  return context;
};
