import { create } from 'zustand';
import { AuthResponse } from '../model/types';

interface User extends AuthResponse {}

interface UserStore {
  user: User | null;
  setUser: (user: AuthResponse | null) => void;
}

export const userStore = create<UserStore>((set) => ({
  user: {
    id: 'f53d8c40-3cad-4557-82c0-639c387ba89f',
    accessToken:
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc1NDQ4MjQ4Nywicm9sZXMiOlsiQURNSU4iXSwiZmlyc3ROYW1lIjoiYWRtaW4iLCJwcm9qZWN0TmFtZSI6IlRFU1RfUFJPSkVDVF8xIiwicHJvamVjdElkIjoiZjI4NDc5M2ItMTQwYy00NWZmLTgwZmItNzQ5YmYwYmU1NDRjIn0.5hF-PRS_vQBhAClhvyTx_aCW8XnGd-T9p77sxWhx17bfyOHIfUUaTheItPZfTa4zW_1NjEjVJbjlfN3DmhWaUQ',
    expiresIn: '2025-08-06T12:14:47.914+00:00',
    login: 'admin',
    name: 'admin',
    projectId: 'f284793b-140c-45ff-80fb-749bf0be544c',
    projectName: 'TEST_PROJECT_1',
    roles: ['ADMIN'],
  },
  // @ts-ignore
  setUser: (user) => set({ user }),
}));
