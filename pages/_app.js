import '../styles/globals.css'
import React from 'react';
import { Layout } from '../components';
import { stateContext } from '../context/stateContext';
import { Toaster } from 'react-hot-toast';
function MyApp({ Component, pageProps }) {
  return (
    <stateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </stateContext>
  )
}

export default MyApp
