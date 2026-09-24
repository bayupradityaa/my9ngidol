import { useLanguage } from '../i18n/LanguageContext.jsx'
import PageShell, { P } from '../components/PageShell.jsx'

export default function Sources() {
  const { t } = useLanguage()
  return (
    <PageShell eyebrow="SOURCES" eyebrowColor="#FF6B6B" title={t('pages.sources.title')}>
      <P>{t('pages.sources.p1')}</P>
      <P>{t('pages.sources.p2')}</P>
      <P>{t('pages.sources.p3')}</P>
    </PageShell>
  )
}
