'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './login.module.css';

export default function Login() {
  const [loginId, setLoginId] = useState<string>('');
  const [loginPwd, setLoginPwd] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const supabase = createClient();
    let { data: member, error } = await supabase
      .from('member')
      .select('member_id')
      .eq('id', loginId)
      .eq('password', loginPwd);
    if (member && member.length > 0) {
      router.push('/');
    }
    return false;
  };

  return (
    <div className={styles.container}>
      <div className={styles.child}>
        <h1>Login</h1>
        <form className={styles.form} action="/" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ID"
            value={loginId}
            onChange={(event) => setLoginId(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPwd}
            onChange={(event) => setLoginPwd(event.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
