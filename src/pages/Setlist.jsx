import { Link } from 'react-router-dom'
import { Music2, Sparkles, ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import NeoButton from '../components/NeoButton.jsx'
import Reveal from '../motion/Reveal.jsx'
import StaggerGroup from '../motion/StaggerGroup.jsx'

const TEASER_COLORS = ['#FF6B6B', '#4ECDC4', '#FFDB58']

export default function Setlist() {
  const { t } = useLanguage()
  return (
    <div className="relative overflow-hidden">
      <div className="neo-dots pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 py-16 text-center">
        <Reveal variant="pop" delay={60}>
          <span className="neo-border neo-tag bg-neo-coral text-xs font-bold uppercase tracking-widest text-black shadow-[2px_2px_0_0_#000]">
            {t('setlist.badge')}
          </span>
        </Reveal>

        <Reveal variant="fade-up" delay={140} duration={420}>
          <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl">{t('setlist.title')}</h1>
        </Reveal>

        <Reveal variant="fade-up" delay={240} duration={400}>
          <p className="max-w-xl text-lg font-bold opacity-85">{t('setlist.p1')}</p>
        </Reveal>

        {/* Teaser grid: nine song slots waiting to be filled */}
        <StaggerGroup staggerMs={40} duration={350} className="grid w-full max-w-md grid-cols-3 gap-2.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="neo-border flex aspect-square flex-col items-center justify-center gap-1.5 transition-transform duration-200 hover:scale-105 hover:shadow-[4px_4px_0_0_#000] cursor-default"
              style={{ backgroundColor: i === 4 ? '#FFEB3B' : TEASER_COLORS[i % 3] }}
            >
              {i === 4 ? (
                <Sparkles size={26} strokeWidth={3} className="text-black animate-pulse" />
              ) : (
                <Music2 size={22} strokeWidth={3} className="text-black opacity-60" />
              )}
              <span className="text-[10px] font-bold text-black opacity-70">#{i + 1}</span>
            </div>
          ))}
        </StaggerGroup>

        <Reveal variant="fade-up" delay={340} duration={350}>
          <p className="text-sm font-bold opacity-70">{t('setlist.p2')}</p>
        </Reveal>

        <Reveal variant="fade-up" delay={420} duration={400} className="flex flex-col items-center gap-3 sm:flex-row">
          <NeoButton to="/create" variant="red" size="lg" magnetic={true}>
            {t('nav.cta')}
            <ArrowRight size={18} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-1" />
          </NeoButton>
          <Link to="/" className="text-sm font-bold underline decoration-2 underline-offset-4 transition-opacity hover:opacity-100 opacity-80">
            {t('pages.backHome')}
          </Link>
        </Reveal>
      </div>
    </div>
  )
}
