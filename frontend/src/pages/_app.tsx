import { AppProps } from 'next/app';
import '../styles/scroll.css';

import IndexContexts from '../contexts';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <IndexContexts>
      <Component {...pageProps} />
    </IndexContexts>
  );
}

export default MyApp;
