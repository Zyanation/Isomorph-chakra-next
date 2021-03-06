import { Mainnet, Kovan, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { getDefaultProvider } from 'ethers'
import { MetamaskConnect } from './components/MetamaskConnect'

import '../styles/globals.css'
import Layout from '../components/Layout'
import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import react from 'react'
import { useState, useEffect, createContext } from 'react'
import wait from 'wait'

import theme from "../themes/index"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { OptimismKovan } from '../components/OptimisticKovanConfig'



const config: Config = {
  readOnlyChainId: OptimismKovan.chainId,
  readOnlyUrls: {
    [OptimismKovan.chainId]: `https://optimism-kovan.infura.io/v3/${process.env.NEXT_PUBLIC_KOVAN_INFURA}`,
  },
  pollingInterval: 10000,
  autoConnect: false,
}




function MyApp({ Component, pageProps}) {

  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)

  const { colorMode, toggleColorMode } = useColorMode();

  // useEffect(() => {


  //   if (localStorage.getItem('chakra-ui-color-mode') === 'light' && colorMode === 'dark') {
  //     console.log("light to dark")
  //     toggleColorMode()
  //   } else if (localStorage.getItem('chakra-ui-color-mode') === 'dark' && colorMode === 'light') {
  //     console.log("dark to light")
  //     toggleColorMode()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])


  


  return (

    <SessionProvider session={pageProps.session} refetchInterval={0}>
    <ChakraProvider theme={theme}>
    <DAppProvider config={config}>
    <Layout>
        <Component {...pageProps}/>
    </Layout>

    </DAppProvider>
    </ChakraProvider>
    </SessionProvider>
    
  )
  
  
  
  
}

export default MyApp
