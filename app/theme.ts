/* theme.ts */
import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  },
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
    teal: {
      500: '#319795',
    },
    dandelion: {
      100: '#FFE066',
      200: 'FFDA49',
    },
  },
});
