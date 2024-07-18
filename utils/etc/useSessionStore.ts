import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getSession, getUser, loginWithEmail, signOut } from '../supabase/authService';

type UserMetaData = {
  email: string;
  id: string;
};

type SessionStore = {
  isLogined: boolean;
  token: string;
  setIsLogined: (value: boolean) => void;
  setToken: (value: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  checkSession: () => Promise<boolean>;
  userMetaData: UserMetaData;
};

const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      isLogined: false,
      token: '',
      userMetaData: {} as UserMetaData,
      setIsLogined: (value: boolean) => set({ isLogined: value }),
      setToken: (value: string) => set({ token: value }),
      login: async (email: string, password: string) => {
        const { user, session } = await loginWithEmail(email, password);
        set({
          isLogined: true,
          token: session.access_token || '',
          userMetaData: session.user.user_metadata as UserMetaData,
        });
      },
      logout: async () => {
        await signOut();
        set({
          isLogined: false,
          token: '',
          userMetaData: {} as UserMetaData,
        });
      },
      checkSession: async () => {
        const session = await getSession();
        if (session) {
          set({
            isLogined: true,
            userMetaData: session.user.user_metadata as UserMetaData,
          });
          return true;
        } else {
          set({
            isLogined: false,
            userMetaData: {} as UserMetaData,
          });
          return false;
        }
      },
    }),
    {
      name: 'Login-Session',
    },
  ),
);

export default useSessionStore;
