import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getSession, loginWithEmail, signOut } from '../supabase/authService';

type SessionStore = {
  isLogined: boolean;
  token: string;
  setIsLogined: (value: boolean) => void;
  setToken: (value: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  checkAuth: () => void;
};

const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      isLogined: false,
      token: '',
      setIsLogined: (value: boolean) => set({ isLogined: value }),
      setToken: (value: string) => set({ token: value }),
      login: async (email: string, password: string) => {
        const { user, session } = await loginWithEmail(email, password);
        set({
          isLogined: true,
          token: session?.access_token || '',
        });
      },
      logout: async () => {
        await signOut();
        set({
          isLogined: false,
          token: '',
        });
      },
      checkAuth: async () => {
        const session = await getSession();
        if (session) {
          set({
            isLogined: true,
            token: session.access_token,
          });
        }
      },
    }),
    {
      name: 'Login-Session',
    },
  ),
);

export default useSessionStore;
