import { Flex, Heading, Link, Button, Box } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

export default function Header() {
  return (
    <header>
      {/* 첫 번째 줄: 얇은 줄 및 로그인/회원가입 링크 */}
      <Flex justify="flex-end" alignItems="center" py={1} borderBottom="1px" borderColor="gray.200">
        <Link color="main.2" mx={2} as={NextLink} href="/login">
          Login
        </Link>
        <Link color="main.2" mx={2} as={NextLink} href="/join">
          Join
        </Link>
      </Flex>

      {/* 두 번째 줄: 메인 링크 및 기타 링크들 */}
      <Flex justify="space-between" alignItems="baseline" my={10}>
        <Link as={NextLink} href="/">
          <Heading as="h3" size="lg" color="brand.900">
            Study With Me :)
          </Heading>
        </Link>
        <Flex alignItems="center">
          <Link color="black" mx={2} as={NextLink} href="/youtube">
            YouTube
          </Link>
          <Link color="black" mx={2} as={NextLink} href="/board">
            Board
          </Link>
        </Flex>
      </Flex>
      <hr />
    </header>
  );
}
