import { Fragment } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import '../styles/globals.css'
import "swiper/css/bundle"
import 'jodit/build/jodit.min.css';

import { store } from '../configs/redux/store'
import { AuthProvider } from '../hooks/authHook';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>{"Duta Tech"}</title>
      </Head>
      <Provider store={store}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </Fragment>
  )
}

export default MyApp
