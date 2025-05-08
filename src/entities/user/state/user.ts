import { create } from 'zustand';
import { AuthResponse } from '../model/types';

interface User extends AuthResponse {}

interface UserStore {
  user: User | null;
  setUser: (user: AuthResponse | null) => void;
}

export const userStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
