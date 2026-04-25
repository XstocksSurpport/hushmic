import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { getStoredLocale, isRtl, setStoredLocale, type Locale } from './locales'
import { translate, type MessageKey } from './messages'

type I18nValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: MessageKey, params?: Record<string, string>) => string
  dir: 'ltr' | 'rtl'
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLoc] = useState<Locale>(getStoredLocale)

  const setLocale = useCallback((l: Locale) => {
    setLoc(l)
    setStoredLocale(l)
  }, [])

  const t = useCallback(
    (key: MessageKey, params?: Record<string, string>) =>
      translate(locale, key, params),
    [locale]
  )

  const dir = isRtl(locale) ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-Hans' : locale
    document.documentElement.dir = dir
  }, [locale, dir])

  const value = useMemo<I18nValue>(
    () => ({ locale, setLocale, t, dir }),
    [locale, setLocale, t, dir]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18nValue {
  const v = useContext(I18nContext)
  if (!v) throw new Error('useI18n must be used within I18nProvider')
  return v
}
