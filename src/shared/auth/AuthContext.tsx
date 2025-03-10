import { router } from '@/pages/router';
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { getAuthToken } from '../lib';
import { routes } from '../routes';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    // saveAuthToken(token);
    router.navigate(routes.WELCOME);
  };

  const logout = () => {
    setIsAuthenticated(false);
    // removeAuthToken();
    router.navigate(routes.LOGIN);
  };

  useEffect(() => {
    const res = !!getAuthToken();
    if (res) {
      setIsAuthenticated(true);
    }
  }, []);

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
