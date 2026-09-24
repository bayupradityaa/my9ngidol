import { Link } from 'react-router-dom'
import { Music2, Sparkles, ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import NeoButton from '../components/NeoButton.jsx'

const TEASER_COLORS = ['#FF6B6B', '#4ECDC4', '#FFDB58']

export default function Setlist() {
  const { t } = useLanguage()
  return (
    <div className="relative overflow-hidden">
      <div className="neo-dots pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 py-16 text-center">
        <span className="neo-border neo-tag bg-neo-coral text-xs font-bold uppercase tracking-widest text-black">
          {t('setlist.badge')}
        </span>
        <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl">{t('setlist.title')}</h1>
        <p className="max-w-xl text-lg font-bold opacity-85">{t('setlist.p1')}</p>

        {/* Teaser grid: nine song slots waiting to be filled */}
        <div className="grid w-full max-w-md grid-cols-3 gap-2.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="neo-border flex aspect-square flex-col items-center justify-center gap-1.5"
              style={{ backgroundColor: i === 4 ? '#FFEB3B' : TEASER_COLORS[i % 3] }}
            >
              {i === 4 ? (
                <Sparkles size={26} strokeWidth={3} className="text-black" />
              ) : (
                <Music2 size={22} strokeWidth={3} className="text-black opacity-60" />
              )}
              <span className="text-[10px] font-bold text-black opacity-70">#{i + 1}</span>
            </div>
          ))}
        </div>

        <p className="text-sm font-bold opacity-70">{t('setlist.p2')}</p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <NeoButton to="/create" variant="red" size="lg">
            {t('nav.cta')}
            <ArrowRight size={18} strokeWidth={3} />
          </NeoButton>
          <Link to="/" className="text-sm font-bold underline decoration-2 underline-offset-4">
            {t('pages.backHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}
