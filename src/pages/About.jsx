import { useLanguage } from '../i18n/LanguageContext.jsx'
import PageShell, { P } from '../components/PageShell.jsx'

export default function About() {
  const { t } = useLanguage()
  return (
    <PageShell eyebrow="ABOUT" eyebrowColor="#4ECDC4" title={t('pages.about.title')}>
      <P>{t('pages.about.p1')}</P>
      <P>{t('pages.about.p2')}</P>
      <P>{t('pages.about.p3')}</P>
    </PageShell>
  )
}
