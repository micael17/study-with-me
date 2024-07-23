'use client';

import { Flex, Heading, Link, Button, Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import NextLink from 'next/link';
import useSessionStore from '@/utils/etc/useSessionStore';

export default function Header() {
  const { isLogined, checkSession, logout, userMetaData } = useSessionStore();

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <header>
      {/* 첫 번째 줄: 얇은 줄 및 로그인/회원가입 링크 */}
      <Flex justify="flex-start" alignItems="center" py={1} borderBottom="1px" borderColor="gray.200">
        {isLogined ? (
          <Link color="main.3" mx={3} onClick={logout} as={NextLink} href="/">
            Logout
          </Link>
        ) : (
          <>
            <Link color="main.3" mx={3} as={NextLink} href="/login">
              Login
            </Link>
            <Link color="main.3" mx={3} as={NextLink} href="/join">
              Join
            </Link>
          </>
        )}
        {isLogined && <Box color="main.4">안녕하세요. {userMetaData.member_id} 님!</Box>}
      </Flex>

      {/* 두 번째 줄: 메인 링크 및 기타 링크들 */}
      <Flex justify="flex-start" alignItems="baseline" ml={3} my={5}>
        <Link as={NextLink} href="/">
          <Heading as="h3" size="lg" color="main.4">
            Study With Me :)
          </Heading>
        </Link>
      </Flex>

      <Flex alignItems="center">
        <Link color="black" ml={3} as={NextLink} href="/">
          YouTube
        </Link>
        <Link color="black" ml={3} as={NextLink} href="/board">
          Board
        </Link>
        <Link color="black" ml={3} as={NextLink} href="/study">
          Study
        </Link>
      </Flex>
      <hr />
    </header>
  );
}
