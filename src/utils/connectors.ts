import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletLinkConnector as WalletLink_Connector } from '@web3-react/walletlink-connector'
import { WalletConnectConnector as WalletConnect_Connector } from '@web3-react/walletconnect-connector'

export const BrowserWalletConnector = {
  id: 'metamask',
  connector: new InjectedConnector({
    supportedChainIds: [137],
  }),
}

export const WalletConnectConnector = {
  id: 'walletconnect',
  connector: new WalletConnect_Connector({
    supportedChainIds: [137],
    rpc: { [137]: 'https://rpc-mainnet.matic.network' },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
  }),
}

export const WalletLinkConnector = {
  id: 'coinbase',
  connector: new WalletLink_Connector({
    supportedChainIds: [137],
    url: 'https://mainnet.infura.io/v3/',
    appName: 'solace-coinbase',
  }),
}
