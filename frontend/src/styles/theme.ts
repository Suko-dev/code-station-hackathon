import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    palette: {
      dark: '#222831',
      light: '#DDDDDD',
      blue: '#30475e',
      red: '#f05454',
    },
  },
  fonts: {
    heading: 'Source Sans Pro',
    body: 'Source Sans Pro',
  },
  styles: {
    global: {
      body: {
        bg: 'palette.dark',
        color: 'palette.light',
      },
    },
  },
});
