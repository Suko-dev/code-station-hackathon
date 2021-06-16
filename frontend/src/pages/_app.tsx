import { Provider as NextAuthProvider } from 'next-auth/client';
import { AppProps } from 'next/app';

import '../styles/scroll.css';

import IndexContexts from '../contexts';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NextAuthProvider session={pageProps.session}>
      <IndexContexts>
        <Component {...pageProps} />
      </IndexContexts>
    </NextAuthProvider>
  );
}

export default MyApp;
