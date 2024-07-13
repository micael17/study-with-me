'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme'; //커스텀 테마

import './fonts.css';
import { useEffect, useState } from 'react';
export function Providers({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (isReady) {
    document.documentElement.classList.add('hydrated');
  }

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
