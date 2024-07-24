// components/ScrollRestoration.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useScrollStore } from '@/utils/store/useScrollStore';

const ScrollRestoration = () => {
  const { setScrollPosition, getScrollPosition, pageRendered, setPageRendered } = useScrollStore();
  const pathname = usePathname();

  useEffect(() => {
    //아래는 정적 페이지(서버 렌더링 완료된)에서는 잘 작동하는 브라우저 제공 기능
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'auto';
    }

    //아래는 동적 페이지(클라 렌더링 완료된)에서 작동하는 커스텀 기능
    const handleBeforeUnload = () => {
      setScrollPosition(pathname, window.scrollY);
    };

    const handlePopState = () => {
      const position = getScrollPosition(pathname);
      window.scrollTo(0, position);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (pageRendered) {
      const position = getScrollPosition(pathname);
      window.scrollTo(0, position);
      setPageRendered(false);
    }
  }, [pathname, pageRendered]);

  return null;
};

export default ScrollRestoration;
