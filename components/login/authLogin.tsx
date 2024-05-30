'use client';

import { createClient } from '@/utils/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function App() {
  const supabase = createClient();

  return (
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
      providers={['google', 'kakao']}
    />
  );
}
