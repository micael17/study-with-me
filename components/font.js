import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Rubik';
        font-style: bold;
        font-weight: 500;
        font-display: swap;
        src: url('./public/fonts/Rubik/Rubik-VariableFont_wght.ttf') format('ttf');
      }
      /* latin */
      @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url('./public/fonts/Noto_Sans_KR/NotoSansKR-VariableFont_wght.ttf') format('ttf');
      }
      `}
  />
);

export default Fonts;
