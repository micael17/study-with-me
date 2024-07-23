import { supabase } from './supabaseClient';

export const loginWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;

  const { user, session } = data;
  return { user, session };
};

export const signUp = async (email: string, password: string, memberId: string) => {
  //member_id 명칭으로 가입해야, DB 테이블의 컬럼과 일치하게 된다.
  const member_id = memberId;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        member_id,
      },
    },
  });

  if (error) {
    console.log('Error Sign Up:', error);
    return error.status;
  } else {
    return 200;
  }
};

export const signOut = async () => {
  await supabase.auth.signOut();
};

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;

  return data.session;
};

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;

  return data.user;
};

export const getMemberInfo = async (uid: string) => {
  const { data, error } = await supabase.from('member').select(`*`).eq('uid', uid);
  if (error) throw error;

  return data;
};
