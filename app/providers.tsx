'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme'; //커스텀 테마

import './fonts.css';
export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
