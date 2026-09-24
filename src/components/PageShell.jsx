import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function PageShell({ title, children, eyebrow = 'INFO', eyebrowColor = '#2196F3' }) {
  const { t } = useLanguage()
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold underline decoration-2 underline-offset-4"
      >
        <ArrowLeft size={16} strokeWidth={3} />
        {t('pages.backHome')}
      </Link>
      <span
        className="neo-border neo-tag text-xs font-bold uppercase tracking-widest text-black"
        style={{ backgroundColor: eyebrowColor }}
      >
        {eyebrow}
      </span>
      <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
      <div className="prose-neo mt-6 flex flex-col gap-4">{children}</div>
    </div>
  )
}

export function P({ children }) {
  return (
    <p className="neo-card p-4 text-base leading-relaxed opacity-90">{children}</p>
  )
}
