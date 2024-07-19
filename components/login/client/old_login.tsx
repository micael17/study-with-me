'use client';

import { createClient } from '@/utils/supabase/board';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './login.module.css';
import { Button, Input } from '@chakra-ui/react';

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
        <h1>로그인</h1>
        <hr />
        <form className={styles.form} action="/" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="ID"
            value={loginId}
            onChange={(event) => setLoginId(event.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={loginPwd}
            onChange={(event) => setLoginPwd(event.target.value)}
            required
          />
          <hr />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
