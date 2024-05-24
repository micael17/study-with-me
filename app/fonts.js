// import { Noto_Sans_KR, Rubik } from 'next/font/google';

// const rubik = Rubik({
//   subsets: ['latin'],
//   variable: '--font-rubik',
// });

// const notoSansKor = Noto_Sans_KR({
//   variable: '--font-noto-kr',
// });

// export const fonts = {
//   rubik,
//   notoSansKor,
// };

import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Rubik';
        font-style: bold;
        font-weight: 500;
        font-display: auto;
        src: url('../public/fonts/Rubik/Rubik-VariableFont_wght.ttf') format('ttf');
      }
      /* latin */
      @font-face {
        font-family: 'Noto Sans KR;
        font-style: normal;
        font-weight: 300;
        font-display: auto;
        src: url('../public/fonts/Noto_Sans_KR/NotoSansKR-VariableFont_wght.ttf') format('ttf');
      }
      `}
  />
);

export default Fonts;
