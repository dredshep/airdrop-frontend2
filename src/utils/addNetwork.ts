/**
 * agrega o cambia la red con el chainid que le mandes
 * si se le manda el chainid de la red que tiene el usario seleccionada no hace nada
 * @param {int} id es el chainid de la blockchain
 */

export default async function addNetwork(id: number) {
  let networkData
  switch (id) {
    //bsctestnet
    case 97:
      networkData = [
        {
          chainId: '0x61',
          chainName: 'BSCTESTNET',
          rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
          nativeCurrency: {
            name: 'BINANCE COIN',
            symbol: 'BNB',
            decimals: 18,
          },
          blockExplorerUrls: ['https://testnet.bscscan.com/'],
        },
      ]
      break
    //bscmainet
    case 56:
      networkData = [
        {
          chainId: '0x137',
          chainName: 'Polygon Mainnet',
          rpcUrls: [
            'https://polygon-rpc.com',
            'https://rpc-mainnet.matic.network',
            'https://rpc-mainnet.maticvigil.com',
            'https://rpc-mainnet.matic.quiknode.pro',
          ],
          nativeCurrency: {
            name: 'Polygon',
            symbol: 'MATIC',
            decimals: 18,
          },
          blockExplorerUrls: ['https://polygonscan.com/'],
        },
      ]
      break
    default:
      break
  }

  // agregar red o cambiar red
  return (
    window as unknown as {
      ethereum: {
        request: ({ method, params }: { method: string; params: any[] | undefined }) => Promise<any>
      }
    }
  ).ethereum.request({
    method: 'wallet_addEthereumChain',
    params: networkData,
  })
}
