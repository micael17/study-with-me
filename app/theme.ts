/* theme.ts */
import { extendTheme, textDecoration } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      '.hydrated body': {
        visibility: 'visible',
      },
      body: {
        visibility: 'hidden',
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
      900: '#1a365d', // 진한 검정에 가까운 남색
      800: '#153e75', // 남색
      700: '#2a69ac', // 진한 물색
    },
    main: {
      1: '#FFFAE6', // 매우 옅은 레몬색
      2: '#FF9F66', // 옅은 오렌지
      3: '#FF5F00', // 붉은 오렌지
      4: '#002379', // 남색
    },
    teal: {
      500: '#319795', // 청록
    },
    dandelion: {
      100: '#FFE066', // 조금 더 옅은 귤색
      200: '#FFDA49', // 옅은 귤색
    },
  },
});
