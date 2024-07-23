import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getSession, getUser, loginWithEmail, signOut } from '../supabase/authService';

type UserMetaData = {
  email: string;
  uid: string; // supabase에서는 'sub'라고 나온다.
  member_id: string; //key
};

type SessionStore = {
  isLogined: boolean;
  setIsLogined: (value: boolean) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  checkSession: () => Promise<boolean>;
  uid: string;
  userMetaData: UserMetaData;
};

const initInfo = (isLogined?: boolean, uid?: string, userMetaData?: UserMetaData) => {
  return {
    isLogined: isLogined || false,
    uid: uid || '',
    userMetaData: userMetaData || ({} as UserMetaData),
  };
};

const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      isLogined: false,
      uid: '',
      userMetaData: {} as UserMetaData,
      setIsLogined: (value: boolean) => set({ isLogined: value }),
      login: async (email: string, password: string) => {
        const { user } = await loginWithEmail(email, password);
        set(initInfo(true, user.id, user.user_metadata as UserMetaData));
      },
      logout: async () => {
        await signOut();
        set(initInfo());
      },
      checkSession: async () => {
        const session = await getSession();
        if (session) {
          set(initInfo(true, session.user.id, session.user.user_metadata as UserMetaData));
          return true;
        } else {
          set(initInfo());
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
