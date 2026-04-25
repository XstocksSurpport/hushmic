import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { I18nProvider } from './i18n/I18nContext.tsx'
import './index.css'
import { WalletProvider } from './wallet/WalletContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <WalletProvider>
        <App />
      </WalletProvider>
    </I18nProvider>
  </StrictMode>,
)
