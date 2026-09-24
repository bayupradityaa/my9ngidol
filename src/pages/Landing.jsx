import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MousePointerClick, LayoutGrid, Share2, Trophy, ArrowRight, ArrowUpRight, TrendingUp, Users,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { useTopMembers } from '../hooks/useTopMembers.js'
import NeoButton from '../components/NeoButton.jsx'
import NeoCard from '../components/NeoCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import NineGrid from '../components/NineGrid.jsx'
import HangingPolaroidSection from '../components/HangingPolaroidSection.jsx'
import { members, getTeamLabel } from '../data/members.js'
import { getDownloadCount } from '../lib/firebase.js'

const YEAR = new Date().getFullYear()
// A fixed, recognizable example formation for the hero (first 9 of the roster).
const EXAMPLE = members.slice(0, 9)

export default function Landing() {
  const { t, lang } = useLanguage()
  const { rows } = useTopMembers(9)

  // Global "formations created" counter — goes up by one on every download.
  const [downloads, setDownloads] = useState(null)
  useEffect(() => {
    let mounted = true
    getDownloadCount().then(({ count }) => {
      if (mounted) setDownloads(count)
    })
    return () => {
      mounted = false
    }
  }, [])

  const steps = [
    { Icon: MousePointerClick, t: t('how.s1t'), d: t('how.s1d'), color: '#FFEB3B' },
    { Icon: LayoutGrid, t: t('how.s2t'), d: t('how.s2d'), color: '#2196F3' },
    { Icon: Share2, t: t('how.s3t'), d: t('how.s3d'), color: '#4ECDC4' },
  ]

  const creations = [
    { title: t('community.c1'), color: '#FF6B6B', picks: members.slice(0, 9) },
    { title: t('community.c2'), color: '#2196F3', picks: members.slice(9, 18) },
    { title: t('community.c3'), color: '#FFDB58', picks: members.slice(18, 27) },
  ]

  return (
    <div>
      {/* HERO — statement headline + real example formation (mirrors reference) */}
      <section className="relative overflow-hidden border-b-[3px] border-black">
        <div className="neo-dots pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div className="flex flex-col gap-6">
            <span className="font-display text-sm uppercase tracking-[0.2em] opacity-70">
              {t('hero.eyebrow')}
            </span>
            <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl md:text-6xl lg:text-7xl">
              <span className="block">
                {t('hero.titleA')}
                <span className="bg-neo-red px-2 text-black" style={{ boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>
                  {t('hero.titleHi')}
                </span>
              </span>
              <span className="block">{t('hero.titleB')}</span>
            </h1>
            <p className="max-w-lg text-lg opacity-85">{t('hero.subtitle')}</p>
            {downloads !== null && (
              <div
                className="neo-border inline-flex w-fit items-center gap-2 bg-neo-teal px-3 py-2 text-black neo-shadow neo-press cursor-default"
                title={t('hero.downloadsLabel')}
              >
                <Users size={16} strokeWidth={3} />
                <span className="font-display text-base leading-none">
                  {downloads.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')}
                </span>
                <span className="text-xs font-bold uppercase tracking-wide">
                  {t('hero.downloadsLabel')}
                </span>
              </div>
            )}
            <div className="flex flex-col items-start gap-4">
              <NeoButton to="/create" variant="red" size="lg" className="w-full sm:w-auto">
                {t('hero.ctaPrimary')}
                <ArrowRight size={18} strokeWidth={3} />
              </NeoButton>
              <Link to="/rankings" className="inline-flex items-center gap-1 font-bold underline decoration-2 underline-offset-4">
                {t('hero.ctaSecondary')}
                <ArrowUpRight size={16} strokeWidth={3} />
              </Link>
            </div>
          </div>

          {/* Right: real example formation card + caption */}
          <div className="mx-auto w-full max-w-sm">
            <div className="neo-shadow-lg neo-border" style={{ boxShadow: '6px 6px 0 0 var(--neo-shadow)' }}>
              <NineGrid picks={EXAMPLE} title={t('hero.exampleLabel')} />
            </div>
            <p className="mt-3 text-center text-sm font-bold opacity-70">{t('hero.caption')}</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading eyebrow="01" title={t('how.title')} subtitle={t('how.subtitle')} align="center" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <NeoCard key={i} className="flex flex-col gap-3 p-6">
              <span className="neo-border flex h-14 w-14 items-center justify-center text-black" style={{ backgroundColor: s.color }}>
                <s.Icon size={26} strokeWidth={3} />
              </span>
              <h3 className="font-display text-xl">{s.t}</h3>
              <p className="opacity-80">{s.d}</p>
            </NeoCard>
          ))}
        </div>
      </section>

      {/* TRENDING (replaces SaaS pricing) */}
      <section className="border-y-[3px] border-black" style={{ backgroundColor: 'var(--neo-muted)' }}>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow={<span className="flex items-center gap-1"><Trophy size={12} strokeWidth={3} /> TOP 9</span>}
              eyebrowColor="#FFDB58"
              title={t('trending.title')}
              subtitle={t('trending.subtitle')}
            />
            <NeoButton to="/rankings" size="sm">
              {t('trending.viewAll')}
              <ArrowRight size={16} strokeWidth={3} />
            </NeoButton>
          </div>

          {rows.length === 0 ? (
            <NeoCard className="mt-8 p-6 text-center font-bold">{t('trending.empty')}</NeoCard>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((r) => (
                <div key={r.member.id} className="neo-card flex items-center gap-4 p-3">
                  <span className="neo-border flex h-12 w-12 shrink-0 items-center justify-center bg-black font-display text-lg text-white">
                    {r.rank}
                  </span>
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center font-display text-lg"
                    style={{ backgroundColor: r.member.color, color: '#000', border: '3px solid #000' }}
                  >
                    {r.member.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-display">{r.member.name}</div>
                    <div className="text-xs font-bold opacity-70">
                      {getTeamLabel(r.member.team)} • {r.count} {t('trending.picks')}
                    </div>
                  </div>
                  <div className="neo-border flex items-center gap-1 bg-neo-yellow px-2 py-1 text-xs font-bold text-black">
                    <TrendingUp size={12} strokeWidth={3} /> {r.count}
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="mt-4 text-xs font-bold opacity-60">
            {t('trending.updated')}: {YEAR} • {lang === 'id' ? 'Sumber data: agregat pilihan' : 'Data source: pick aggregate'}
          </p>
        </div>
      </section>

      {/* COMMUNITY CREATIONS (replaces SaaS testimonials) */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading eyebrow="02" eyebrowColor="#4ECDC4" title={t('community.title')} subtitle={t('community.subtitle')} align="center" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {creations.map((c, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="neo-border bg-black px-3 py-2">
                <span className="font-display text-sm uppercase tracking-widest text-white">{c.title}</span>
              </div>
              <div className="overflow-hidden">
                <NineGrid picks={c.picks} title={c.title} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UNIFIED HANGING POLAROIDS SECTION (9 OSHI & 9 SETLIST PREVIEWS) */}
      <HangingPolaroidSection />
    </div>
  )
}
