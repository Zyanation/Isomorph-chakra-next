import { Chain } from '@usedapp/core'

export const OptimismKovan: Chain = {
  chainId: 69,
  chainName: 'OptimismKovan',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x0000000000000000000000000000000000000000',
  getExplorerAddressLink: (address: string) => `https://kovan.optimism.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://kovan.optimism.io/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: 'https://kovan.optimism.io/',
  blockExplorerUrl: 'https://kovan-optimistic.etherscan.io',
  nativeCurrency: {
    name: 'KOR',
    symbol: 'KOR',
    decimals: 18,
  }
}
// IMPORTANT: Fill that object with your own data.