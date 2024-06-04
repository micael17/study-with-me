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
        width: '100%',
        margin: '0 auto',
        fontWeight: 300,
        background: '#fff',
      },
      hr: {
        margin: '10px 0',
      },
      '.buttons': {
        marginTop: '20px',
      },
      /* Button: {
        backgroundColor: 'white',
        color: 'black',
        padding: '10px 20px',
        marginRight: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
      }, */

      /* 'Button:hover': {
        backgroundColor: '#c3c5c5',
      }, */
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
    main: {
      1: '#FFFAE6',
      2: '#FF9F66',
      3: '#FF5F00',
      4: '#002379',
    },
    teal: {
      500: '#319795',
    },
    dandelion: {
      100: '#FFE066',
      200: '#FFDA49',
    },
  },
});
