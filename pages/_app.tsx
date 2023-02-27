import React from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return <Component {...pageProps} key={router.asPath} />;
}

export default MyApp;
