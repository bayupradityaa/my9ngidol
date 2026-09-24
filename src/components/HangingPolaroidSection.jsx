import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Music2,
  Disc3,
  CheckCircle2,
  Clock,
  Sparkle,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import NeoButton from './NeoButton.jsx'
import { members } from '../data/members.js'
import { MemberAvatar } from './MemberCard.jsx'

// Sample 9 members for the 9-Oshi PNG preview
const SAMPLE_MEMBERS = members.slice(0, 9)

// Sample setlist songs for the 9-Setlist PNG preview
const SAMPLE_SETLISTS = [
  { no: '01', title: 'Heavy Rotation', tag: 'Song', color: '#FF6B6B' },
  { no: '02', title: 'Pajama Drive', tag: 'Setlist', color: '#4ECDC4' },
  { no: '03', title: 'Aturan Anti Cinta', tag: 'Setlist', color: '#FFDB58' },
  { no: '04', title: 'Matahari Milikku', tag: 'Setlist', color: '#A8E6CF' },
  { no: '05', title: 'Rapsodi', tag: '★ CENTER', color: '#FFEB3B', isCenter: true },
  { no: '06', title: 'Bel Terakhir Berbunyi', tag: 'Setlist', color: '#FF8B94' },
  { no: '07', title: 'Saka Agari', tag: 'Setlist', color: '#85E3FF' },
  { no: '08', title: 'Tunas di Balik Seragam', tag: 'Setlist', color: '#B39DDB' },
  { no: '09', title: 'Cara Ceroboh', tag: 'Song', color: '#FFD3B6' },
]

export default function HangingPolaroidSection() {
  const { t } = useLanguage()
  const scrollRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const [activeTab, setActiveTab] = useState(0)

  // Track scroll position to update active indicator
  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft } = scrollRef.current
    const cardWidth = card1Ref.current ? card1Ref.current.clientWidth + 24 : 320
    const index = Math.round(scrollLeft / cardWidth)
    setActiveTab(Math.min(Math.max(index, 0), 1))
  }

  const scrollToSlide = (index) => {
    if (!scrollRef.current) return
    const targetCard = index === 0 ? card1Ref.current : card2Ref.current
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
    setActiveTab(index)
  }

  return (
    <section className="relative overflow-hidden border-t-[3px] border-black bg-neo-yellow/20 py-16 md:py-24 dark:bg-[#16151f]">
      {/* Background dot pattern */}
      <div className="neo-dots pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <span className="neo-border neo-tag bg-neo-yellow text-xs font-bold uppercase tracking-widest text-black shadow-[2px_2px_0_0_#000]">
            {t('finalCta.tag') || 'KREASI FORMAT PNG • SHAREABLE'}
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
            {t('finalCta.headline') || 'Pilih & Pamerkan Formasi Favoritmu'}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-base font-bold opacity-80 sm:text-lg">
            {t('finalCta.desc') || 'Hasil kreasi otomatis berformat foto PNG siap posting ke Instagram Story, X, atau disimpan ke galeri.'}
          </p>

          {/* Mobile interactive switch tabs */}
          <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
            <button
              onClick={() => scrollToSlide(0)}
              className={`neo-border flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all ${
                activeTab === 0
                  ? 'bg-neo-red text-white shadow-[3px_3px_0_0_#000]'
                  : 'bg-white text-black opacity-70 dark:bg-[#2a2833] dark:text-white'
              }`}
            >
              <CheckCircle2 size={14} strokeWidth={2.5} />
              {t('finalCta.oshiTab') || '1. 9 Oshi (Tersedia)'}
            </button>
            <button
              onClick={() => scrollToSlide(1)}
              className={`neo-border flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all ${
                activeTab === 1
                  ? 'bg-neo-coral text-black shadow-[3px_3px_0_0_#000]'
                  : 'bg-white text-black opacity-70 dark:bg-[#2a2833] dark:text-white'
              }`}
            >
              <Clock size={14} strokeWidth={2.5} />
              {t('finalCta.setlistTab') || '2. 9 Setlist (Segera)'}
            </button>
          </div>
        </div>

        {/* Clothesline / Hanging Wire Across Top (Desktop) */}
        <div className="relative mx-auto mb-1 hidden w-full max-w-4xl items-center justify-center md:flex">
          {/* Main wire with line & wall pins */}
          <div className="relative h-1.5 w-full rounded-full bg-black shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
            {/* Left anchor nail pin */}
            <div className="absolute -left-3 -top-2 flex h-5.5 w-5.5 items-center justify-center rounded-full border-2 border-black bg-neo-yellow shadow-[2px_2px_0_0_#000]">
              <div className="h-1.5 w-1.5 rounded-full bg-black" />
            </div>
            {/* Right anchor nail pin */}
            <div className="absolute -right-3 -top-2 flex h-5.5 w-5.5 items-center justify-center rounded-full border-2 border-black bg-neo-yellow shadow-[2px_2px_0_0_#000]">
              <div className="h-1.5 w-1.5 rounded-full bg-black" />
            </div>
          </div>
        </div>

        {/* Polaroid Cards Container (Desktop: 2 side-by-side | Mobile: Smooth horizontal swipe carousel) */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-8 pt-10 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 md:pt-8 lg:gap-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* ============================================================== */}
          {/* POLAROID 1: 9 OSHI (ACTIVE / READY TO BUILD)                   */}
          {/* ============================================================== */}
          <div
            ref={card1Ref}
            className="w-[85vw] max-w-[370px] shrink-0 snap-center md:w-auto md:max-w-none"
          >
            <div className="group relative flex flex-col rounded-sm border-[3.5px] border-black bg-[#FFFEF8] p-4 text-black shadow-[8px_8px_0_0_#000] transition-all duration-300 md:-rotate-1.5 md:p-5 md:hover:rotate-0 md:hover:-translate-y-2 md:hover:shadow-[12px_12px_0_0_#000]">
              {/* Clothespin / Peg on Top */}
              <div className="absolute -top-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center">
                {/* String loop */}
                <div className="h-2 w-0.5 bg-black" />
                {/* Clothespin body */}
                <div className="relative flex h-8 w-5 flex-col items-center justify-between rounded-[2px] border-2 border-black bg-[#E5A967] shadow-[2px_2px_0_0_#000]">
                  {/* Metal coil spring */}
                  <div className="my-auto h-2 w-3.5 rounded-[1px] border border-black bg-gray-400" />
                  <div className="h-1 w-0.5 bg-black" />
                </div>
              </div>

              {/* Top Banner Tag */}
              <div className="mb-3 flex items-center justify-between">
                <span className="neo-border bg-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  {t('hero.badge')}
                </span>
                <span className="neo-border flex items-center gap-1 bg-neo-teal px-2 py-0.5 text-[10px] font-bold uppercase text-black">
                  <span className="h-2 w-2 rounded-full bg-black animate-pulse" />
                  LIVE NOW
                </span>
              </div>

              {/* PNG PHOTO PREVIEW AREA (9 Oshi 3x3 Grid) */}
              <div className="relative overflow-hidden border-[3px] border-black bg-[#FFEB3B] p-2.5 shadow-[4px_4px_0_0_#000]">
                {/* Inner simulated PNG header */}
                <div className="mb-2 flex items-center justify-between border-b-2 border-black pb-1.5">
                  <span className="font-display text-sm leading-none tracking-tight text-black">
                    My 9 Ngidol
                  </span>
                  <span className="border-2 border-black bg-black px-2 py-0.5 text-[9px] font-bold text-white">
                    MY 9 OSHI
                  </span>
                </div>

                {/* 3x3 grid */}
                <div className="grid grid-cols-3 gap-1.5">
                  {SAMPLE_MEMBERS.map((m, i) => {
                    const isCenter = i === 4
                    return (
                      <div
                        key={m.id}
                        className={`relative flex aspect-square flex-col overflow-hidden border-2 border-black ${
                          isCenter ? 'ring-2 ring-black' : ''
                        }`}
                        style={{ backgroundColor: m.color }}
                      >
                        {isCenter && (
                          <span className="absolute left-0.5 top-0.5 z-10 border border-black bg-black px-1 py-0.5 text-[7px] font-bold text-white">
                            {t('create.center')}
                          </span>
                        )}
                        <div className="flex flex-1 items-center justify-center">
                          <MemberAvatar
                            member={m}
                            style={{ width: '100%', height: '100%', fontSize: '18px' }}
                          />
                        </div>
                        <div className="truncate border-t-2 border-black bg-white px-1 py-0.5 text-center font-display text-[9px] text-black">
                          {m.name.split(' ')[0]}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Inner simulated PNG footer */}
                <div className="mt-2 flex items-center justify-between text-[8px] font-bold text-black opacity-80">
                  <span>JKT48 • fan-made</span>
                  <span>my9ngidol.pages.dev</span>
                </div>

                {/* Subtle photo sheen effect */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20" />
              </div>

              {/* POLAROID BOTTOM CAPTION & ACTIONS */}
              <div className="mt-5 flex flex-1 flex-col justify-between text-left">
                <div>
                  <h3 className="font-display text-2xl leading-tight sm:text-3xl text-black">
                    {t('finalCta.title')}
                  </h3>
                  <p className="mt-2 text-sm font-bold text-black/80">
                    {t('finalCta.subtitle')}
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-2.5">
                  <NeoButton
                    to="/create"
                    variant="red"
                    size="md"
                    className="w-full justify-center text-sm shadow-[4px_4px_0_0_#000]"
                  >
                    {t('finalCta.button')}
                    <ArrowRight size={16} strokeWidth={3} />
                  </NeoButton>
                  <Link
                    to="/rankings"
                    className="inline-flex items-center justify-center gap-1 text-xs font-bold text-black underline decoration-2 underline-offset-4 opacity-80 hover:opacity-100"
                  >
                    {t('hero.ctaSecondary')}
                    <ArrowUpRight size={14} strokeWidth={3} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* POLAROID 2: 9 SETLIST (COMING SOON TEASER)                     */}
          {/* ============================================================== */}
          <div
            ref={card2Ref}
            className="w-[85vw] max-w-[370px] shrink-0 snap-center md:w-auto md:max-w-none"
          >
            <div className="group relative flex flex-col rounded-sm border-[3.5px] border-black bg-[#FFFEF8] p-4 text-black shadow-[8px_8px_0_0_#000] transition-all duration-300 md:rotate-1.5 md:p-5 md:hover:rotate-0 md:hover:-translate-y-2 md:hover:shadow-[12px_12px_0_0_#000]">
              {/* Clothespin / Peg on Top */}
              <div className="absolute -top-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center">
                {/* String loop */}
                <div className="h-2 w-0.5 bg-black" />
                {/* Clothespin body */}
                <div className="relative flex h-8 w-5 flex-col items-center justify-between rounded-[2px] border-2 border-black bg-[#E5A967] shadow-[2px_2px_0_0_#000]">
                  {/* Metal spring coil */}
                  <div className="my-auto h-2 w-3.5 rounded-[1px] border border-black bg-gray-400" />
                  <div className="h-1 w-0.5 bg-black" />
                </div>
              </div>

              {/* Top Banner Tag */}
              <div className="mb-3 flex items-center justify-between">
                <span className="neo-border bg-neo-coral px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                  {t('setlist.badge')}
                </span>
                <span className="neo-border flex items-center gap-1 bg-neo-mustard px-2 py-0.5 text-[10px] font-bold uppercase text-black">
                  <Sparkles size={11} strokeWidth={3} />
                  COMING SOON
                </span>
              </div>

              {/* PNG PHOTO PREVIEW AREA (9 Setlist 3x3 Grid) */}
              <div className="relative overflow-hidden border-[3px] border-black bg-[#4ECDC4] p-2.5 shadow-[4px_4px_0_0_#000]">
                {/* Inner simulated PNG header */}
                <div className="mb-2 flex items-center justify-between border-b-2 border-black pb-1.5">
                  <div className="flex items-center gap-1 font-display text-sm leading-none tracking-tight text-black">
                    <Disc3 size={15} strokeWidth={2.5} className="animate-spin" style={{ animationDuration: '6s' }} />
                    9 Setlist
                  </div>
                  <span className="border-2 border-black bg-black px-2 py-0.5 text-[9px] font-bold text-white">
                    FAVORITE TRACKS
                  </span>
                </div>

                {/* 3x3 grid */}
                <div className="grid grid-cols-3 gap-1.5">
                  {SAMPLE_SETLISTS.map((s, i) => {
                    const isCenter = s.isCenter
                    return (
                      <div
                        key={i}
                        className={`relative flex aspect-square flex-col justify-between overflow-hidden border-2 border-black p-1 text-center ${
                          isCenter ? 'ring-2 ring-black shadow-[2px_2px_0_0_#000]' : ''
                        }`}
                        style={{ backgroundColor: s.color }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="rounded-xs border border-black bg-black px-1 py-0.5 text-[7px] font-bold text-white">
                            {s.no}
                          </span>
                          {isCenter ? (
                            <Sparkle size={10} strokeWidth={3} className="text-black fill-black" />
                          ) : (
                            <Music2 size={10} strokeWidth={2.5} className="text-black opacity-60" />
                          )}
                        </div>

                        <div className="my-auto flex flex-col items-center">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full border border-black bg-black text-white">
                            <Disc3 size={10} strokeWidth={2.5} />
                          </div>
                        </div>

                        <div className="truncate border border-black bg-white px-0.5 py-0.5 text-[8px] font-bold text-black">
                          {s.title}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Inner simulated PNG footer */}
                <div className="mt-2 flex items-center justify-between text-[8px] font-bold text-black opacity-80">
                  <span>JKT48 • fan-made</span>
                  <span className="font-bold underline decoration-1">Coming Soon</span>
                </div>

                {/* Subtle photo sheen effect */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20" />
              </div>

              {/* POLAROID BOTTOM CAPTION & ACTIONS */}
              <div className="mt-5 flex flex-1 flex-col justify-between text-left">
                <div>
                  <h3 className="font-display text-2xl leading-tight sm:text-3xl text-black">
                    {t('setlist.title')}
                  </h3>
                  <p className="mt-2 text-sm font-bold text-black/80">
                    {t('setlist.p1')}
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-2.5">
                  <NeoButton
                    to="/setlist"
                    variant="paper"
                    size="md"
                    className="w-full justify-center text-sm shadow-[4px_4px_0_0_#000]"
                  >
                    {t('setlist.cta')}
                    <ArrowRight size={16} strokeWidth={3} />
                  </NeoButton>
                  <span className="inline-flex items-center justify-center gap-1 text-center text-xs font-bold text-black/70">
                    <Sparkles size={12} strokeWidth={2.5} />
                    {t('setlist.p2')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Swipe Hint and Indicators */}
        <div className="mt-2 flex flex-col items-center gap-2 md:hidden">
          {/* Navigation dots */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToSlide(0)}
              className={`h-2.5 rounded-full border border-black transition-all ${
                activeTab === 0 ? 'w-6 bg-black dark:bg-white' : 'w-2.5 bg-black/20 dark:bg-white/30'
              }`}
              aria-label="Slide 1: 9 Oshi"
            />
            <button
              onClick={() => scrollToSlide(1)}
              className={`h-2.5 rounded-full border border-black transition-all ${
                activeTab === 1 ? 'w-6 bg-black dark:bg-white' : 'w-2.5 bg-black/20 dark:bg-white/30'
              }`}
              aria-label="Slide 2: 9 Setlist"
            />
          </div>
          <span className="text-xs font-bold opacity-60">
            {t('finalCta.swipeHint') || '← Geser halus untuk melihat format berikutnya →'}
          </span>
        </div>
      </div>
    </section>
  )
}
