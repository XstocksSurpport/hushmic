import type { Eip1193Provider } from 'ethers'

export const ETHEREUM_MAINNET_CHAIN_ID = '0x1'
export const ETHEREUM_MAINNET_NAME = 'Ethereum 主网'

const DEFAULT_MAINNET_RPC = 'https://eth.llamarpc.com'

/**
 * 确保钱包已切到以太坊主网；若未添加该网络则先添加再切换
 */
export async function ensureEthereumMainnet(
  ethereum: Eip1193Provider
): Promise<void> {
  const id = await ethereum.request({ method: 'eth_chainId' })
  if (id === ETHEREUM_MAINNET_CHAIN_ID) return
  const rpc = import.meta.env.VITE_ETH_RPC_URL || DEFAULT_MAINNET_RPC
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ETHEREUM_MAINNET_CHAIN_ID }],
    })
  } catch (err) {
    const code = (err as { code?: number }).code
    if (code === 4902) {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: ETHEREUM_MAINNET_CHAIN_ID,
            chainName: 'Ethereum Mainnet',
            nativeCurrency: {
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: [rpc],
            blockExplorerUrls: ['https://etherscan.io'],
          },
        ],
      })
      return
    }
    throw err
  }
}
