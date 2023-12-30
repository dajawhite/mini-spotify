import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'

//wrap application in session provider
//allowing

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
