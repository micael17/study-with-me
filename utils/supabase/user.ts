import { createClient } from './server';

export const loginWithEmail = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'example@email.com',
    password: 'example-password',
  });
};
