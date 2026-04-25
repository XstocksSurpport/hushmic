import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { BrowserProvider } from 'ethers'
import type { Eip1193Provider } from 'ethers'
import { ensureEthereumMainnet } from '../lib/chain'

type WalletState = {
  address: string | null
  chainId: string | null
  connecting: boolean
  error: string | null
  provider: BrowserProvider | null
}

type WalletContextValue = WalletState & {
  connect: () => Promise<void>
  disconnect: () => void
  hasMetaMask: boolean
  refreshAccount: () => Promise<void>
}

const WalletContext = createContext<WalletContextValue | null>(null)

function getBrowserEthereum(): Eip1193Provider | null {
  if (typeof window === 'undefined') return null
  const w = window as { ethereum?: Eip1193Provider & { isMetaMask?: boolean } }
  return w.ethereum ?? null
}

function shortError(e: unknown): string {
  if (e instanceof Error && e.message) return e.message
  if (e && typeof e === 'object' && 'message' in e) {
    const m = (e as { message?: string }).message
    if (m) return m
  }
  return String(e)
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [provider, setProvider] = useState<BrowserProvider | null>(null)

  const hasMetaMask = useMemo(() => {
    return !!getBrowserEthereum()
  }, [])

  const syncFromEip = useCallback(async (eth: Eip1193Provider) => {
    const p = new BrowserProvider(eth)
    setProvider(p)
    const net = await p.getNetwork()
    setChainId('0x' + net.chainId.toString(16))
    const s = await p.getSigner()
    const a = await s.getAddress()
    setAddress(a)
  }, [])

  const refreshAccount = useCallback(async () => {
    const eth = getBrowserEthereum()
    if (!eth) {
      setAddress(null)
      setChainId(null)
      setProvider(null)
      return
    }
    try {
      const accounts = (await eth.request({
        method: 'eth_accounts',
      })) as string[]
      if (accounts.length > 0) {
        await ensureEthereumMainnet(eth)
      }
      await syncFromEip(eth)
    } catch {
      setAddress(null)
      setChainId(null)
      setProvider(null)
    }
  }, [syncFromEip])

  useEffect(() => {
    const eth = getBrowserEthereum()
    if (!eth) return
    const onChain = (...args: unknown[]) =>
      setChainId(typeof args[0] === 'string' ? args[0] : null)
    const onAccounts = (...args: unknown[]) => {
      const a = args[0]
      if (Array.isArray(a) && typeof a[0] === 'string') setAddress(a[0])
      else setAddress(null)
    }
    const e = eth as Eip1193Provider & {
      on: (ev: string, fn: (...args: unknown[]) => void) => void
      removeListener: (ev: string, fn: (...args: unknown[]) => void) => void
    }
    e.on('chainChanged', onChain)
    e.on('accountsChanged', onAccounts)
    queueMicrotask(() => {
      void refreshAccount()
    })
    return () => {
      e.removeListener('chainChanged', onChain)
      e.removeListener('accountsChanged', onAccounts)
    }
  }, [refreshAccount])

  const connect = useCallback(async () => {
    setError(null)
    const eth = getBrowserEthereum()
    if (!eth) {
      setError('NO_WALLET_EXTENSION')
      return
    }
    setConnecting(true)
    try {
      await eth.request({ method: 'eth_requestAccounts' })
      await ensureEthereumMainnet(eth)
      await syncFromEip(eth)
    } catch (e) {
      setError(shortError(e))
    } finally {
      setConnecting(false)
    }
  }, [syncFromEip])

  const disconnect = useCallback(() => {
    setAddress(null)
    setChainId(null)
    setProvider(null)
    setError(null)
  }, [])

  const value: WalletContextValue = {
    address,
    chainId,
    connecting,
    error,
    provider,
    connect,
    disconnect,
    hasMetaMask,
    refreshAccount,
  }

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  )
}

/** @see useWallet in same module — also exported for App */
// eslint-disable-next-line react-refresh/only-export-components
export function useWallet(): WalletContextValue {
  const v = useContext(WalletContext)
  if (!v) throw new Error('useWallet must be used within WalletProvider')
  return v
}
