import React from 'react';
import '../styles/globals.css'

//toaster allow us to show a small notification pop-up we we add something to the cart.
import { Toaster } from 'react-hot-toast';
import { Layout } from '../components';
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
    
  )
}

export default MyApp
