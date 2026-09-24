import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const label = isDark ? t('common.lightMode') : t('common.darkMode')
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="neo-btn h-11 w-11 !p-0"
      style={{ backgroundColor: isDark ? '#FFEB3B' : '#2196F3', color: isDark ? '#000' : '#fff' }}
    >
      {isDark ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
    </button>
  )
}
