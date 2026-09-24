import { useLanguage } from '../i18n/LanguageContext.jsx'
import PageShell, { P } from '../components/PageShell.jsx'

export default function Terms() {
  const { t } = useLanguage()
  return (
    <PageShell eyebrow="TERMS" eyebrowColor="#FFDB58" title={t('pages.terms.title')}>
      <P>{t('pages.terms.p1')}</P>
      <P>{t('pages.terms.p2')}</P>
      <P>{t('pages.terms.p3')}</P>
    </PageShell>
  )
}
