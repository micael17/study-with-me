'use client';

import useSessionStore from '@/utils/store/useSessionStore';
import { Button, Link, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function WriteButton() {
  const router = useRouter();
  const toast = useToast();
  const { checkSession } = useSessionStore();

  const handleClick = async () => {
    const isLogined = await checkSession();
    if (isLogined) {
      router.push('/board/editor'); // 세션이 있을 경우 글쓰기 페이지로 이동
    } else {
      toast({
        title: '로그인이 필요합니다.',
        description: '글을 작성하려면 로그인 해주세요.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      router.push('/login'); // 세션이 없을 경우 로그인 페이지로 이동
    }
  };

  return <Button onClick={handleClick}>글쓰기</Button>;
}
