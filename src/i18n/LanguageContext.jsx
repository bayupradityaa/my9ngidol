import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translate } from './dict.js'

const LanguageContext = createContext(null)
const STORAGE_KEY = '9oshi:lang'
export const LANGUAGES = [
  { code: 'id', label: 'ID', name: 'Bahasa Indonesia' },
  { code: 'en', label: 'EN', name: 'English' },
]

function getInitialLang() {
  if (typeof window === 'undefined') return 'id'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'id' || stored === 'en') return stored
  const nav = navigator.language?.toLowerCase() || ''
  return nav.startsWith('en') ? 'en' : 'id'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang((l) => (l === 'id' ? 'en' : 'id')),
      t: (key) => translate(lang, key),
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
