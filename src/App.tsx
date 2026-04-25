import { useCallback, useState } from 'react'
import { BrowserProvider } from 'ethers'
import type { Eip1193Provider } from 'ethers'
import './App.css'
import { useI18n } from './i18n/I18nContext.tsx'
import { LOCALE_LIST, type Locale } from './i18n/locales'
import { sendMintPayment, MINT_VALUE_ETH, NFT_TOTAL_SUPPLY } from './lib/mint'
import { ETHEREUM_MAINNET_CHAIN_ID, ensureEthereumMainnet } from './lib/chain'
import { useWallet } from './wallet/WalletContext'

function getInjectedEthereum(): Eip1193Provider | null {
  if (typeof window === 'undefined') return null
  return (
    (window as { ethereum?: Eip1193Provider | undefined }).ethereum ?? null
  )
}

const TICKER_KEYS = [
  'ticker0',
  'ticker1',
  'ticker2',
  'ticker3',
  'ticker4',
  'ticker5',
] as const

function shortAddr(a: string) {
  return `${a.slice(0, 6)}…${a.slice(-4)}`
}

function LangSelect() {
  const { locale, setLocale, t } = useI18n()
  return (
    <label className="lang-select">
      <span className="sr-only">{t('uiLanguage')}</span>
      <select
        className="lang-select-input"
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        aria-label={t('uiLanguage')}
      >
        {LOCALE_LIST.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function App() {
  const { t, dir } = useI18n()
  const {
    address,
    chainId,
    connect,
    connecting,
    error: walletError,
    hasMetaMask,
  } = useWallet()

  const [minting, setMinting] = useState(false)
  const [mintMsg, setMintMsg] = useState<string | null>(null)
  const [mintErr, setMintErr] = useState<string | null>(null)

  const onMainnet = chainId === ETHEREUM_MAINNET_CHAIN_ID

  const displayWalletError =
    walletError === 'NO_WALLET_EXTENSION'
      ? t('errorWalletNoBrowser')
      : walletError

  const mint = useCallback(async () => {
    setMintMsg(null)
    setMintErr(null)
    if (!hasMetaMask) {
      setMintErr(t('errorWalletNoBrowser'))
      return
    }
    setMinting(true)
    try {
      if (!address) {
        await connect()
      }
      const eth = getInjectedEthereum()
      if (!eth) {
        setMintErr(t('errorConnect'))
        return
      }
      const accounts = (await eth.request({
        method: 'eth_accounts',
      })) as string[]
      if (!accounts || accounts.length === 0) {
        setMintErr(t('errorConnect'))
        return
      }
      await ensureEthereumMainnet(eth)
      const b = new BrowserProvider(eth)
      const signer = await b.getSigner()
      const tx = await sendMintPayment(signer)
      setMintMsg(t('txSent', { eth: MINT_VALUE_ETH, hash: tx.hash }))
      await tx.wait()
      setMintMsg(t('mintSuccessLocked', { hash: tx.hash }))
    } catch (e) {
      setMintMsg(null)
      setMintErr(e instanceof Error ? e.message : String(e))
    } finally {
      setMinting(false)
    }
  }, [address, connect, hasMetaMask, t])

  return (
    <div className="shell" dir={dir}>
      <div className="shell-deco" aria-hidden>
        <div className="shell-deco-abstract" />
        <div className="shell-deco-abstract shell-deco-abstract--b" />
        <div className="shell-deco-pixels" />
        <div className="shell-deco-dither" />
      </div>
      <div className="ticker" aria-hidden>
        <div className="ticker-track">
          {[
            ...TICKER_KEYS.map((k) => t(k)),
            ...TICKER_KEYS.map((k) => t(k)),
          ].map((text, i) => (
            <span key={i} className="ticker-item">
              {text}
            </span>
          ))}
        </div>
      </div>

      <header className="header">
        <a href="/" className="brand">
          <img
            src="/logo.png"
            alt={t('logoAlt')}
            className="brand-logo"
            width={220}
            height={48}
          />
        </a>
        <div className="header-right">
          {!hasMetaMask && <span className="hint">{t('noWallet')}</span>}
          {address ? (
            <div
              className="wallet-capsule"
              data-mainnet={onMainnet ? 'true' : 'false'}
              title={onMainnet ? t('walletHintMainnet') : t('walletHintWrong')}
            >
              <span className="wallet-capsule-edge" aria-hidden />
              <span className="wallet-capsule-inner">
                <span className="wallet-capsule-badge">
                  {onMainnet ? 'ETH' : '!'}
                </span>
                <span className="mono wallet-capsule-addr">
                  {shortAddr(address)}
                </span>
              </span>
            </div>
          ) : null}
          <button
            type="button"
            className="btn btn-outline"
            disabled={connecting}
            onClick={() => void connect()}
          >
            {address ? t('reconnect') : t('connect')}
          </button>
          <LangSelect />
        </div>
      </header>

      {displayWalletError ? (
        <p className="banner err page-banner">{displayWalletError}</p>
      ) : null}

      <main className="main">
        <div className="hero-split">
          <div className="hero-visual">
            <div className="mascot-stage" aria-hidden>
              <div className="mascot-glow" />
              <img
                src="/mascot.png?v=11"
                alt=""
                className="mascot-img"
                width={360}
                height={495}
                decoding="async"
                fetchPriority="low"
              />
            </div>
          </div>

          <div className="hero-content">
            <section className="intro intro-cyberflow" aria-labelledby="about-heading">
              <div className="intro-watermark" aria-hidden>
                <img src="/logo.png" alt="" width={320} height={64} />
              </div>
              <h2 id="about-heading" className="intro-title text-gradient">
                {t('aboutTitle')}
              </h2>
              <p className="intro-lede text-gradient-muted">{t('aboutP1')}</p>
              <p>{t('aboutP2')}</p>
              <p className="intro-footnote">{t('aboutP3', { count: String(NFT_TOTAL_SUPPLY) })}</p>
            </section>

            <div className="mint-dock mint-dock--air">
              <div className="mint-block">
                <p className="mint-headline text-gradient-sm">
                  {t('mintLockDesc', { eth: MINT_VALUE_ETH })}
                </p>
                <div className="btn-clip-outer">
                  <button
                    type="button"
                    className="btn btn-mint btn-mint-cut"
                    disabled={minting || !hasMetaMask}
                    onClick={() => void mint()}
                  >
                    {minting ? t('minting') : t('mintLockCta')}
                  </button>
                </div>
                {mintMsg ? <p className="banner ok">{mintMsg}</p> : null}
                {mintErr ? <p className="banner err">{mintErr}</p> : null}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="site-footer" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="footer-title">
          {t('footerTitle')}
        </h2>
        <nav
          className="footer-links"
          aria-label={t('footerTitle')}
        >
          <a
            className="footer-link"
            href="https://x.com/hushmic"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('footerX')}
          </a>
          <a
            className="footer-link"
            href="https://t.me/ProjectHushmic"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('footerTg')}
          </a>
          <a
            className="footer-link"
            href="https://discord.com/invite/EbKa5yXsu4"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('footerDc')}
          </a>
        </nav>
      </footer>
    </div>
  )
}
