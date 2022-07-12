// import 'theme/styles/reset.css'

import type {AppProps} from 'next/app'

import {globalStyles} from 'theme'

function App({Component, pageProps}: AppProps) {
  globalStyles()
  return <Component {...pageProps} />
}

export default App
