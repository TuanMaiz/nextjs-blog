import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './header/Header'
import '@/styles/SubmenuHeader.css'
import {SessionProvider} from 'next-auth/react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {

  return(
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  )
}
