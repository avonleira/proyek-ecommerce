import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import '../styles/globals.css'
import "swiper/css/bundle"
import 'jodit/build/jodit.min.css';

import { store } from '../configs/redux/store'
// import { AuthProvider } from '../services/AuthService'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <AuthProvider> */}
        <Component {...pageProps} />
      {/* </AuthProvider> */}
    </Provider>
  )
}

export default MyApp
