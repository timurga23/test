export interface AuthResponse {
  accessToken: string;
  expiresIn: string;
  login: string;
  name: string;
  projectId: string;
  projectName: string;
  roles: string[];
}

export interface User {
  id: string;
  login: string;
  role: 'ADMIN' | 'EDITOR' | 'USER' | 'MANAGER';
}
