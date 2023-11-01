import { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { ApolloProvider } from '@apollo/client'
import client from '../graphql/apollo-client'
import '../styles/globals.css'

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

function MyApp({ Component, pageProps }: AppProps) {

  const firebaseConfig = {
    apiKey: "AIzaSyDJVgBARynfJY8wzTl509BPXF2tzosFkPg",
    authDomain: "masiltown.firebaseapp.com",
    projectId: "masiltown",
    storageBucket: "masiltown.appspot.com",
    messagingSenderId: "453604147049",
    appId: "1:453604147049:web:646df701d99708be2ac7f8",
    measurementId: "G-SWQ0MMYELC"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
