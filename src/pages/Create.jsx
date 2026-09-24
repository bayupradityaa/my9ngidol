import { useEffect, useMemo, useRef, useState } from 'react'
import { Shuffle, Trash2, Download, Share2, Send, Check, Loader2, Link2, MousePointerClick } from 'lucide-react'
import { members } from '../data/members.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import NeoButton from '../components/NeoButton.jsx'
import NeoCard from '../components/NeoCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import FormationGrid from '../components/FormationGrid.jsx'
import SlotPicker from '../components/SlotPicker.jsx'
import StoryCard from '../components/StoryCard.jsx'
import { submitPicks } from '../lib/firebase.js'

const MAX = 9
const SLOTS_KEY = '9oshi:slots'

const emptySlots = () => Array(MAX).fill(null)

function loadSlots() {
  try {
    const raw = JSON.parse(localStorage.getItem(SLOTS_KEY) || '[]')
    const valid = (id) => (id && members.some((m) => m.id === id) ? id : null)
    const arr = Array.isArray(raw) ? raw.slice(0, MAX).map(valid) : []
    while (arr.length < MAX) arr.push(null)
    return arr
  } catch {
    return emptySlots()
  }
}

export default function Create() {
  const { t } = useLanguage()

  const [slots, setSlots] = useState(loadSlots) // array(9) of memberId | null
  const [pickerSlot, setPickerSlot] = useState(null) // index being edited, or null
  const [busy, setBusy] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)

  const gridRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(SLOTS_KEY, JSON.stringify(slots))
  }, [slots])

  const slotMembers = useMemo(
    () => slots.map((id) => (id ? members.find((m) => m.id === id) : null)),
    [slots],
  )
  const usedIds = useMemo(() => slots.filter(Boolean), [slots])
  const filledCount = usedIds.length
  const isComplete = filledCount === MAX

  function resetResult() {
    setImageUrl(null)
    setSubmitted(false)
  }

  function assign(memberId) {
    setSlots((prev) => {
      const next = [...prev]
      // if picked member is already elsewhere, remove it from there first
      const existing = next.indexOf(memberId)
      if (existing >= 0) next[existing] = null
      next[pickerSlot] = memberId
      return next
    })
    resetResult()
    setPickerSlot(null)
  }

  function clearSlot(i) {
    setSlots((prev) => {
      const next = [...prev]
      next[i] = null
      return next
    })
    resetResult()
  }

  function clearAll() {
    setSlots(emptySlots())
    resetResult()
  }

  function shuffleNine() {
    const pool = [...members]
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
    setSlots(pool.slice(0, MAX).map((m) => m.id))
    resetResult()
  }

  async function generate() {
    if (!isComplete) return
    setBusy(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      // StoryCard is already 1080x1920 (IG Story), so scale stays 1.
      const canvas = await html2canvas(gridRef.current, {
        backgroundColor: '#FFEB3B',
        scale: 1,
        useCORS: true,
        logging: false,
      })
      const url = canvas.toDataURL('image/png')
      setImageUrl(url)
      const a = document.createElement('a')
      a.href = url
      a.download = 'my9ngidol-story.png'
      a.click()
    } catch (err) {
      console.error('[9oshi] generate failed:', err)
      alert('Gagal membuat gambar: ' + err.message)
    } finally {
      setBusy(false)
    }
  }

  async function share() {
    const url = 'https://9oshi.pages.dev/'
    const text = t('create.shareText')
    try {
      if (navigator.share) {
        await navigator.share({ title: 'My 9 Ngidol', text, url })
      } else {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' ' + url)}`, '_blank')
      }
    } catch {
      /* user cancelled */
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText('https://9oshi.pages.dev/')
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* ignore */
    }
  }

  async function submit() {
    const res = await submitPicks(usedIds)
    if (res.ok) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 2500)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <SectionHeading eyebrow="CREATE" eyebrowColor="#FF5252" title={t('create.title')} subtitle={t('create.subtitle')} align="center" />

      {/* Helper actions */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <NeoButton type="button" size="sm" onClick={shuffleNine} variant="teal">
          <Shuffle size={16} strokeWidth={3} />
          {t('create.shuffle')}
        </NeoButton>
        <NeoButton type="button" size="sm" onClick={clearAll} disabled={filledCount === 0}>
          <Trash2 size={16} strokeWidth={3} />
          {t('create.clear')}
        </NeoButton>
      </div>

      {/* Tap-a-slot instruction */}
      <div className="mt-8 flex flex-col items-center gap-1 text-center">
        <span className="inline-flex items-center gap-2 font-display text-lg">
          <MousePointerClick size={18} strokeWidth={3} />
          {t('create.tapHint')}
          <span aria-hidden="true">↓</span>
        </span>
        <span className="text-xs font-bold opacity-60">{t('create.tapHint2')}</span>
        <span className="mt-1 neo-border bg-neo-yellow px-2 py-0.5 text-xs font-bold text-black">
          {filledCount}/9 — {MAX - filledCount} {t('create.remaining')}
        </span>
      </div>

      {/* Interactive formation */}
      <div className="mt-6">
        <FormationGrid slots={slotMembers} onSlotClick={setPickerSlot} onClearSlot={clearSlot} />
      </div>

      {/* Primary + secondary actions */}
      <div className="mt-8 flex flex-col gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <NeoButton type="button" variant="red" size="lg" onClick={generate} disabled={busy || !isComplete}>
            {busy ? <Loader2 size={18} strokeWidth={3} className="animate-spin" /> : <Download size={18} strokeWidth={3} />}
            {busy ? t('create.generating') : t('create.generate')}
          </NeoButton>
          <NeoButton type="button" size="lg" onClick={share} disabled={imageUrl == null}>
            <Share2 size={18} strokeWidth={3} />
            {t('create.share')}
          </NeoButton>
        </div>
        {!isComplete && <p className="text-center text-xs font-bold opacity-60">{t('create.needNine')}</p>}

        <div className="grid gap-3 sm:grid-cols-2">
          <NeoButton type="button" variant="blue" onClick={submit} disabled={submitted || filledCount === 0}>
            {submitted ? <Check size={16} strokeWidth={3} /> : <Send size={16} strokeWidth={3} />}
            {submitted ? t('create.submitted') : t('create.submit')}
          </NeoButton>
          <NeoButton type="button" onClick={copyLink}>
            {copied ? <Check size={16} strokeWidth={3} /> : <Link2 size={16} strokeWidth={3} />}
            {copied ? t('create.copied') : t('create.copyLink')}
          </NeoButton>
        </div>
        <p className="text-center text-xs font-bold opacity-60">{t('create.submitHint')}</p>
      </div>

      {imageUrl && (
        <NeoCard className="mt-6 p-3">
          <p className="mb-2 text-xs font-bold opacity-70">PNG 1080 × 1920 — Instagram Story</p>
          <img src={imageUrl} alt="My 9 Ngidol preview" className="neo-border mx-auto w-full max-w-[270px]" />
        </NeoCard>
      )}

      {/* Off-screen export target rendered at the exact IG Story size (1080x1920) */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-99999px', top: 0, width: '1080px' }}>
        <StoryCard ref={gridRef} picks={slotMembers} />
      </div>

      {pickerSlot !== null && (
        <SlotPicker
          slotIndex={pickerSlot}
          usedIds={usedIds}
          currentId={slots[pickerSlot]}
          onPick={assign}
          onClear={() => {
            clearSlot(pickerSlot)
            setPickerSlot(null)
          }}
          onClose={() => setPickerSlot(null)}
        />
      )}
    </div>
  )
}
