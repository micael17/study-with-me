import { Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

export default function Header() {
  return (
    <header>
      <Flex justify="space-between" borderBottom="1px" borderColor="gray.200" p={3}>
        <Link as={NextLink} href="/">
          <Heading as="h3" size="lg" m={1}>
            Study With Me :)
          </Heading>
        </Link>
        <Heading as="h3" size="lg" m={1}>
          <Link color="teal.500">Login</Link>
          <Link color="teal.500" as={NextLink} href="/board">
            Board
          </Link>
          <Link color="dandelion.100">Join</Link>
        </Heading>
      </Flex>
    </header>
  );
}
