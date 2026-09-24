import { useLanguage } from '../i18n/LanguageContext.jsx'
import NeoButton from '../components/NeoButton.jsx'

export default function NotFound() {
  const { t } = useLanguage()
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-20 text-center">
      <span className="neo-border neo-shadow-lg bg-neo-red px-6 py-4 font-display text-6xl text-black">
        {t('pages.notFound.title')}
      </span>
      <p className="text-xl font-bold opacity-80">{t('pages.notFound.text')}</p>
      <NeoButton to="/" variant="yellow" size="lg">
        {t('pages.notFound.back')}
      </NeoButton>
    </div>
  )
}
