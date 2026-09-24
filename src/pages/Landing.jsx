import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MousePointerClick, LayoutGrid, Share2, Trophy, ArrowRight, ArrowUpRight, TrendingUp, Users, Sparkles,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { useTopMembers } from '../hooks/useTopMembers.js'
import NeoButton from '../components/NeoButton.jsx'
import NeoCard from '../components/NeoCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import NineGrid from '../components/NineGrid.jsx'
import SetlistHeroPreview from '../components/SetlistHeroPreview.jsx'
import HangingPolaroidSection from '../components/HangingPolaroidSection.jsx'
import Reveal from '../motion/Reveal.jsx'
import StaggerGroup from '../motion/StaggerGroup.jsx'
import NeoMarquee from '../motion/NeoMarquee.jsx'
import { members, getTeamLabel } from '../data/members.js'
import { getDownloadCount } from '../lib/firebase.js'

const YEAR = new Date().getFullYear()
// A fixed, recognizable example formation for the hero (first 9 of the roster).
const EXAMPLE = members.slice(0, 9)

export default function Landing() {
  const { t, lang } = useLanguage()
  const { rows } = useTopMembers(9)

  // Rolling hero state: 0 = 9 Oshi, 1 = 9 Setlist
  const [heroMode, setHeroMode] = useState(0)
  const [isHeroPaused, setIsHeroPaused] = useState(false)

  // Auto-roll between 9 Oshi and 9 Setlist every 5.5s (pauses when user hovers)
  useEffect(() => {
    if (isHeroPaused) return
    const timer = setInterval(() => {
      setHeroMode((prev) => (prev === 0 ? 1 : 0))
    }, 5500)
    return () => clearInterval(timer)
  }, [isHeroPaused])

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
      {/* HERO — rolling showcase: alternates smoothly between 9 Oshi & 9 Setlist */}
      <section className="relative overflow-hidden border-b-[3px] border-black">
        <div className="neo-dots pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div className="flex flex-col gap-6">
            <Reveal variant="pop" delay={100} duration={650}>
              <p className="font-display text-sm uppercase tracking-[0.2em] opacity-70">
                {t('hero.eyebrow')}
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={180} duration={950}>
              <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl md:text-6xl lg:text-7xl">
                <span className="block">
                  {t('hero.titleA')}
                  <span className="animate-sticker-slap neo-border mx-1 inline-block bg-neo-red px-2.5 py-0.5 text-black align-baseline shadow-[4px_4px_0_0_#000]">
                    {t('hero.titleHi')}
                  </span>
                </span>
                <span className="mt-2 block">{t('hero.titleB')}</span>
              </h1>
            </Reveal>

            <Reveal variant="fade-up" delay={340} duration={800}>
              <p className="max-w-lg text-lg opacity-85">
                {t('hero.subtitle')}
              </p>
            </Reveal>

            {downloads !== null && (
              <Reveal variant="pop" delay={480} duration={700}>
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
              </Reveal>
            )}

            {/* ROLLING CTA BUTTONS */}
            <Reveal variant="fade-up" delay={560} duration={750}>
              <div
                key={heroMode}
                className="animate-cta-swap flex flex-col items-start gap-4"
                onMouseEnter={() => setIsHeroPaused(true)}
                onMouseLeave={() => setIsHeroPaused(false)}
              >
                {heroMode === 0 ? (
                  <>
                    <NeoButton
                      to="/create"
                      variant="red"
                      size="lg"
                      magnetic={true}
                      className="w-full sm:w-auto"
                    >
                      {t('hero.ctaPrimary')}
                      <ArrowRight size={18} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </NeoButton>
                    <Link
                      to="/rankings"
                      className="inline-flex items-center gap-1 font-bold underline decoration-2 underline-offset-4 transition-opacity hover:opacity-100 opacity-80"
                    >
                      {t('hero.ctaSecondary')}
                      <ArrowUpRight size={16} strokeWidth={3} className="transition-transform duration-200 hover:translate-x-0.5 hover:-translate-y-0.5" />
                    </Link>
                  </>
                ) : (
                  <>
                    <NeoButton
                      to="/setlist"
                      variant="teal"
                      size="lg"
                      magnetic={true}
                      className="w-full sm:w-auto"
                    >
                      {t('hero.setlistCtaPrimary')}
                      <ArrowRight size={18} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </NeoButton>
                    <Link
                      to="/setlist"
                      className="inline-flex items-center gap-1.5 font-bold underline decoration-2 underline-offset-4 transition-opacity hover:opacity-100 opacity-80"
                    >
                      <Sparkles size={16} strokeWidth={2.5} className="text-neo-coral" />
                      {t('hero.setlistCtaSecondary')}
                    </Link>
                  </>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right: real example formation card + caption (ROLLING) */}
          <Reveal variant="fade-up" delay={260} duration={900} className="mx-auto w-full max-w-sm">
            <div
              onMouseEnter={() => setIsHeroPaused(true)}
              onMouseLeave={() => setIsHeroPaused(false)}
            >
              <div
                key={heroMode}
                onClick={() => setHeroMode((prev) => (prev === 0 ? 1 : 0))}
                className="animate-hero-swap neo-shadow-lg neo-border transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                style={{ boxShadow: '6px 6px 0 0 var(--neo-shadow)' }}
                title="Klik untuk rolling formasi"
              >
                {heroMode === 0 ? (
                  <NineGrid picks={EXAMPLE} title={t('hero.exampleLabel')} brandTitle="My 9 Member" />
                ) : (
                  <SetlistHeroPreview title="9 SETLIST" />
                )}
              </div>

              {/* Caption & auto-roll progress indicator */}
              <div className="mt-3 flex items-center justify-between text-sm font-bold opacity-70">
                <p className="truncate">
                  {heroMode === 0 ? t('hero.caption') : t('hero.setlistCaption')}
                </p>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <button
                    type="button"
                    onClick={() => setHeroMode(0)}
                    aria-label="Mode 9 Oshi"
                    className={`h-2 rounded-full border border-black transition-all cursor-pointer ${
                      heroMode === 0 ? 'w-5 bg-black dark:bg-white' : 'w-2 bg-black/20 dark:bg-white/30'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setHeroMode(1)}
                    aria-label="Mode 9 Setlist"
                    className={`h-2 rounded-full border border-black transition-all cursor-pointer ${
                      heroMode === 1 ? 'w-5 bg-black dark:bg-white' : 'w-2 bg-black/20 dark:bg-white/30'
                    }`}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE DIVIDER — signature neobrutalism ticker tape */}
      <NeoMarquee />

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal variant="fade-up" duration={750}>
          <SectionHeading eyebrow="01" title={t('how.title')} subtitle={t('how.subtitle')} align="center" />
        </Reveal>

        <StaggerGroup staggerMs={110} duration={720} className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <NeoCard key={i} interactive={true} className="flex flex-col gap-3 p-6 group">
              <span
                className="neo-border flex h-14 w-14 items-center justify-center text-black transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: s.color }}
              >
                <s.Icon size={26} strokeWidth={3} />
              </span>
              <h3 className="font-display text-xl">{s.t}</h3>
              <p className="opacity-80">{s.d}</p>
            </NeoCard>
          ))}
        </StaggerGroup>
      </section>

      {/* TRENDING (replaces SaaS pricing) */}
      <section className="border-y-[3px] border-black" style={{ backgroundColor: 'var(--neo-muted)' }}>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal variant="fade-up" duration={750}>
              <SectionHeading
                eyebrow={<span className="flex items-center gap-1"><Trophy size={12} strokeWidth={3} /> TOP 9</span>}
                eyebrowColor="#FFDB58"
                title={t('trending.title')}
                subtitle={t('trending.subtitle')}
              />
            </Reveal>
            <Reveal variant="fade-up" delay={180} duration={700}>
              <NeoButton to="/rankings" size="sm" magnetic={true}>
                {t('trending.viewAll')}
                <ArrowRight size={16} strokeWidth={3} />
              </NeoButton>
            </Reveal>
          </div>

          {rows.length === 0 ? (
            <NeoCard className="mt-8 p-6 text-center font-bold">{t('trending.empty')}</NeoCard>
          ) : (
            <StaggerGroup staggerMs={70} duration={650} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((r) => (
                <div
                  key={r.member.id}
                  className="neo-card neo-card-hover flex items-center gap-4 p-3 group cursor-default"
                >
                  <span className="neo-border flex h-12 w-12 shrink-0 items-center justify-center bg-black font-display text-lg text-white transition-colors duration-200 group-hover:bg-neo-yellow group-hover:text-black">
                    {r.rank}
                  </span>
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center font-display text-lg transition-transform duration-200 group-hover:scale-105"
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
                  <div className="neo-border flex items-center gap-1 bg-neo-yellow px-2 py-1 text-xs font-bold text-black transition-transform duration-200 group-hover:scale-105">
                    <TrendingUp size={12} strokeWidth={3} /> {r.count}
                  </div>
                </div>
              ))}
            </StaggerGroup>
          )}
          <p className="mt-4 text-xs font-bold opacity-60">
            {t('trending.updated')}: {YEAR} • {lang === 'id' ? 'Sumber data: agregat pilihan' : 'Data source: pick aggregate'}
          </p>
        </div>
      </section>

      {/* COMMUNITY CREATIONS (replaces SaaS testimonials) */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal variant="fade-up" duration={750}>
          <SectionHeading eyebrow="02" eyebrowColor="#4ECDC4" title={t('community.title')} subtitle={t('community.subtitle')} align="center" />
        </Reveal>
        <StaggerGroup staggerMs={130} duration={750} className="mt-10 grid gap-6 md:grid-cols-3">
          {creations.map((c, i) => (
            <div key={i} className="neo-card-hover flex flex-col gap-3 group">
              <div className="neo-border bg-black px-3 py-2 transition-colors duration-200 group-hover:bg-neo-red">
                <span className="font-display text-sm uppercase tracking-widest text-white">{c.title}</span>
              </div>
              <div className="overflow-hidden">
                <NineGrid picks={c.picks} title={c.title} />
              </div>
            </div>
          ))}
        </StaggerGroup>
      </section>

      {/* UNIFIED HANGING POLAROIDS SECTION (9 OSHI & 9 SETLIST PREVIEWS) */}
      <HangingPolaroidSection />
    </div>
  )
}
