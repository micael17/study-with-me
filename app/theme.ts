/* theme.ts */
import { extendTheme, textDecoration } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        fontSize: 'md',
        color: props.colorMode === 'dark' ? 'white' : 'gray.600',
        maxWidth: '1600px',
        width: '100%',
        margin: '0 auto',
        fontWeight: 300,

        background: '#fff',
      },
      header: {
        margin: '0 auto',
        padding: '50px',
        fontWeight: 300,
        background: '#fff',
      },
    }),
  },
  fonts: {
    heading: `'Rubik', sans-serif`,
    body: `'Noto Sans KR', sans-serif`,
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
