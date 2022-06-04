import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/index.css';
import Navbar from '../components/Navbar';

import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
`;

const App = ({ Component, pageProps }: AppProps) => {
  const AnyComponent = Component as any;
  return (
    <>
      <Head>
        <title>Portfolio Tracker</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Wrapper>
        <Navbar />
        <AnyComponent {...pageProps} />
      </Wrapper>
    </>
  )
}

export default App