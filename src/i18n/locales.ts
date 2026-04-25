export type Locale = 'en' | 'ko' | 'zh' | 'ja' | 'ar'

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_LIST: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ar', label: 'العربية' },
]

export function isRtl(locale: Locale): boolean {
  return locale === 'ar'
}

const STORAGE_KEY = 'hushmic.i18n'
const CODES: Locale[] = ['en', 'ko', 'zh', 'ja', 'ar']

export function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const v = localStorage.getItem(STORAGE_KEY)
  if (v && CODES.includes(v as Locale)) return v as Locale
  return DEFAULT_LOCALE
}

export function setStoredLocale(locale: Locale): void {
  localStorage.setItem(STORAGE_KEY, locale)
}
