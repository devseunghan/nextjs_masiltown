import { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { ApolloProvider } from '@apollo/client'
import client from '../graphql/apollo-client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
