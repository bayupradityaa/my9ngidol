import { useLanguage } from '../i18n/LanguageContext.jsx'
import PageShell, { P } from '../components/PageShell.jsx'

export default function Privacy() {
  const { t } = useLanguage()
  return (
    <PageShell eyebrow="PRIVACY" eyebrowColor="#2196F3" title={t('pages.privacy.title')}>
      <P>{t('pages.privacy.p1')}</P>
      <P>{t('pages.privacy.p2')}</P>
      <P>{t('pages.privacy.p3')}</P>
    </PageShell>
  )
}
