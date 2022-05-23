import React from 'react'
import { Kovan, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core'

const Dashboard = () => {
     const { account, deactivate, activateBrowserWallet} = useEthers()
  const etherBalance = useEtherBalance(account)


  return (
    <div>{account}</div>
  )
}

export default Dashboard