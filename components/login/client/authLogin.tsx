'use client';

import useSessionStore from '@/utils/etc/useSessionStore';
import { createClient } from '@/utils/supabase/board';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const supabase = createClient();

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const { isLogined, setIsLogined, setToken } = useSessionStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    setIsReady(true);

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION') {
        // handle initial session
      } else if (event === 'SIGNED_IN') {
        // handle sign in event

        if (session) {
          setToken(session.access_token);
          setIsLogined(true);
        }
      } else if (event === 'SIGNED_OUT') {
        // handle sign out event
        console.log(session);
        setIsLogined(false);
        router.push('/');
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }
    });

    return () => {
      // call unsubscribe to remove the callback
      data.subscription.unsubscribe();
    };
  }, []);

  return isReady ? (
    <Auth
      supabaseClient={supabase}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: 'green',
            },
          },
        },
      }}
      providers={[]}
    />
  ) : (
    <></>
  );
}
