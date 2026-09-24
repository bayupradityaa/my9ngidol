import { useLanguage, LANGUAGES } from '../i18n/LanguageContext.jsx'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  return (
    <div
      className="neo-border inline-flex overflow-hidden"
      role="group"
      aria-label="Language"
      style={{ boxShadow: '4px 4px 0 0 var(--neo-shadow)' }}
    >
      {LANGUAGES.map((l, i) => {
        const active = lang === l.code
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            className="cursor-pointer px-3.5 py-2.5 text-sm font-bold transition-all"
            style={{
              backgroundColor: active ? '#000' : 'var(--neo-surface)',
              color: active ? '#fff' : 'var(--neo-fg)',
              borderLeft: i === 0 ? 'none' : '3px solid var(--neo-line)',
            }}
          >
            {l.label}
          </button>
        )
      })}
    </div>
  )
}
