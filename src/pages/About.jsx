import { useLanguage } from '../i18n/LanguageContext.jsx'
import PageShell, { P } from '../components/PageShell.jsx'
import NeoButton from '../components/NeoButton.jsx'
import { Instagram, Twitter, Github } from 'lucide-react'

export default function About() {
  const { t } = useLanguage()
  return (
    <PageShell eyebrow="ABOUT" eyebrowColor="#4ECDC4" title={t('pages.about.title')}>
      <P>{t('pages.about.p1')}</P>
      <P>{t('pages.about.p2')}</P>
      <P>{t('pages.about.p3')}</P>

      <div className="neo-border mt-8 p-5 bg-[var(--neo-surface)] neo-shadow">
        <h3 className="font-display text-lg mb-1">Developer</h3>
        <p className="text-sm opacity-80 mb-4">
          Dibuat oleh <strong>Bayu Praditya</strong> sebagai proyek apresiasi fan-made untuk komunitas JKT48.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <NeoButton href="https://www.instagram.com/bayuupradityaa" size="sm" variant="coral">
            <Instagram size={16} strokeWidth={2.5} />
            Instagram
          </NeoButton>
          <NeoButton href="https://x.com/bayu_pradityaa" size="sm" variant="default">
            <Twitter size={16} strokeWidth={2.5} />
            X (Twitter)
          </NeoButton>
          <NeoButton href="https://github.com/bayupradityaa" size="sm" variant="teal">
            <Github size={16} strokeWidth={2.5} />
            GitHub
          </NeoButton>
        </div>
      </div>
    </PageShell>
  )
}
