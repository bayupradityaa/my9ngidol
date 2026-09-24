import { Mail } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import PageShell, { P } from '../components/PageShell.jsx'
import NeoButton from '../components/NeoButton.jsx'

export default function Contact() {
  const { t } = useLanguage()
  const email = 'hello@9oshi.pages.dev'
  return (
    <PageShell eyebrow="CONTACT" eyebrowColor="#FF5252" title={t('pages.contact.title')}>
      <P>{t('pages.contact.p1')}</P>
      <div className="neo-card flex flex-wrap items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
          <span className="neo-border flex h-11 w-11 items-center justify-center bg-neo-yellow text-black">
            <Mail size={20} strokeWidth={3} />
          </span>
          <div>
            <div className="font-display">{t('pages.contact.email')}</div>
            <div className="text-sm font-bold opacity-75">{email}</div>
          </div>
        </div>
        <NeoButton href={`mailto:${email}`} variant="blue" size="sm">
          {t('pages.contact.email')}
        </NeoButton>
      </div>
      <P>{t('pages.contact.social')}</P>
    </PageShell>
  )
}
