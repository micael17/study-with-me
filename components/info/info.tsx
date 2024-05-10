'use client';

import { useRouter } from 'next/navigation';
import style from './info.module.css';

export default function Info() {
  const router = useRouter();

  const handleRouter = (url: string) => {
    router.push(url);
  };

  return (
    <div className={style.info}>
      <div className={style.greeting}>Hello, Study with me!</div>
      <div className={style.btns}>
        <button onClick={() => router.push('login')}>로그인</button>
        <button
          onClick={() => {
            router.push('join');
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
