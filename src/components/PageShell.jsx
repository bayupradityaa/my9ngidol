import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from '../motion/Reveal.jsx'

export default function PageShell({ title, children, eyebrow = 'INFO', eyebrowColor = '#2196F3' }) {
  const { t } = useLanguage()
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Reveal variant="fade-up" delay={50} duration={300}>
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold underline decoration-2 underline-offset-4 transition-transform duration-150 hover:-translate-x-1"
        >
          <ArrowLeft size={16} strokeWidth={3} />
          {t('pages.backHome')}
        </Link>
      </Reveal>

      <Reveal variant="pop" delay={120} duration={350}>
        <span
          className="neo-border neo-tag text-xs font-bold uppercase tracking-widest text-black shadow-[2px_2px_0_0_#000]"
          style={{ backgroundColor: eyebrowColor }}
        >
          {eyebrow}
        </span>
      </Reveal>

      <Reveal variant="fade-up" delay={180} duration={400}>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
      </Reveal>

      <Reveal variant="fade-up" delay={260} duration={400} className="prose-neo mt-6 flex flex-col gap-4">
        {children}
      </Reveal>
    </div>
  )
}

export function P({ children }) {
  return (
    <p className="neo-card p-4 text-base leading-relaxed opacity-90 transition-transform duration-200 hover:-translate-y-0.5">{children}</p>
  )
}
