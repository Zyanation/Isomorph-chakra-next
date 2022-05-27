import { Mainnet, Kovan, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { getDefaultProvider } from 'ethers'
import { MetamaskConnect } from './components/MetamaskConnect'

import '../styles/globals.css'
import Layout from '../components/Layout'
import { ChakraProvider } from '@chakra-ui/react'
import react from 'react'
import { useState, useEffect, createContext } from 'react'

import theme from "../themes"



const config: Config = {
  readOnlyChainId: Kovan.chainId,
  readOnlyUrls: {
    [Kovan.chainId]: `https://kovan.infura.io/v3/${process.env.NEXT_PUBLIC_KOVAN_INFURA}`,
  },
  pollingInterval: 10000,
  autoConnect: false,
}







function MyApp({ Component, pageProps }) {

  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)

  


  return (
    <ChakraProvider theme={theme}>
    <DAppProvider config={config}>
    <Layout>
        <Component {...pageProps} />
    </Layout>

    </DAppProvider>
    </ChakraProvider>

  )
  
  
  
  
}

export default MyApp
