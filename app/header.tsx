import { Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react';

export default function Header() {
  return (
    <header>
      <Flex justify="space-between" my={10}>
        <Link href="/">
          <Heading as="h3" size="lg">
            Study With Me :)
          </Heading>
        </Link>
        <Heading as="h3" size="lg">
          <Link color="teal.500" mx={2} href="/login">
            Login
          </Link>
          <Link color="teal.500" mx={2} href="/board">
            Board
          </Link>
          <Link color="dandelion.100" mx={2} href="/join">
            Join
          </Link>
        </Heading>
      </Flex>
      <hr />
    </header>
  );
}
