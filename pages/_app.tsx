import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://umami.iqfareez.com/script.js"
        data-website-id="11df7d3a-fb7e-4bbd-aacb-222515ea7b32"
        strategy="lazyOnload"
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
