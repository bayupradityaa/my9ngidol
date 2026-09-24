import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, X, Check } from 'lucide-react'
import { members, teams } from '../data/members.js'
import { MemberAvatar } from './MemberCard.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/**
 * Modal picker for a single formation slot. Members already placed in OTHER
 * slots are disabled (no duplicates); the member currently in this slot is
 * highlighted. Background-safe: locks body scroll, closes on Escape/backdrop.
 */
export default function SlotPicker({ slotIndex, usedIds, currentId, onPick, onClear, onClose }) {
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [teamFilter, setTeamFilter] = useState('all')
  const searchRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    searchRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return members.filter((m) => {
      const matchQ = !q || m.name.toLowerCase().includes(q)
      const matchTeam = teamFilter === 'all' || m.team === teamFilter
      return matchQ && matchTeam
    })
  }, [search, teamFilter])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={`${t('create.pickFor')} — ${t('create.slot')} ${slotIndex + 1}`}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />

      <div
        className="neo-border neo-shadow-xl relative flex max-h-[85vh] w-full flex-col sm:max-w-xl"
        style={{ backgroundColor: 'var(--neo-surface)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b-[3px] border-black px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="neo-border flex h-8 w-8 items-center justify-center bg-neo-yellow font-display text-black">
              {slotIndex + 1}
            </span>
            <span className="font-display text-lg">{t('create.pickFor')}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('create.close')}
            className="neo-btn h-10 w-10 !p-0"
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 border-b-[3px] border-black px-4 py-3">
          <div className="neo-border flex items-center gap-2 bg-[var(--neo-surface)] px-3" style={{ boxShadow: '4px 4px 0 0 var(--neo-shadow)' }}>
            <Search size={18} strokeWidth={3} />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('create.search')}
              className="w-full bg-transparent py-3 font-bold outline-none placeholder:opacity-50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTeamFilter('all')}
              className="neo-border neo-press px-3 py-1.5 text-xs font-bold"
              style={{ backgroundColor: teamFilter === 'all' ? '#FFEB3B' : 'var(--neo-surface)' }}
            >
              {t('create.all')}
            </button>
            {teams.map((team) => (
              <button
                key={team.value}
                type="button"
                onClick={() => setTeamFilter(team.value)}
                className="neo-border neo-press px-3 py-1.5 text-xs font-bold"
                style={{ backgroundColor: teamFilter === team.value ? '#FFEB3B' : 'var(--neo-surface)' }}
              >
                {team.label}
              </button>
            ))}
          </div>
        </div>

        {/* Member grid */}
        <div className="grid min-h-0 auto-rows-min grid-cols-3 content-start gap-2.5 overflow-y-auto p-4 sm:grid-cols-4">
          {filtered.length === 0 ? (
            <p className="col-span-full py-6 text-center font-bold opacity-70">{t('create.noResults')}</p>
          ) : (
            filtered.map((m) => {
              const isCurrent = m.id === currentId
              const usedElsewhere = usedIds.includes(m.id) && !isCurrent
              return (
                <button
                  key={m.id}
                  type="button"
                  disabled={usedElsewhere}
                  onClick={() => onPick(m.id)}
                  aria-label={m.name}
                  className="neo-card neo-press relative flex flex-col overflow-hidden text-left disabled:cursor-not-allowed disabled:opacity-40"
                  style={isCurrent ? { outline: '3px solid var(--neo-line)', outlineOffset: '2px' } : undefined}
                >
                  {usedElsewhere && (
                    <span className="absolute right-1 top-1 z-10 bg-black px-1.5 py-0.5 text-[9px] font-bold text-white">
                      {t('create.used')}
                    </span>
                  )}
                  {isCurrent && (
                    <span className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center bg-black text-white">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  )}
                  <MemberAvatar member={m} className="aspect-square w-full text-3xl" />
                  <span className="truncate border-t-[3px] border-black px-2 py-1.5 font-display text-xs">
                    {m.name}
                  </span>
                </button>
              )
            })
          )}
        </div>

        {/* Footer: clear this slot */}
        {currentId && (
          <div className="border-t-[3px] border-black px-4 py-3">
            <button
              type="button"
              onClick={() => onClear()}
              className="neo-btn w-full bg-neo-red text-black"
            >
              <X size={16} strokeWidth={3} />
              {t('create.clearSlot')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
