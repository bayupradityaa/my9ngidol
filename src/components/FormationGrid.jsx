import { Plus, X } from 'lucide-react'
import { MemberAvatar } from './MemberCard.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const CENTER_INDEX = 4

/**
 * Interactive 3x3 formation editor (slot-first, like the reference).
 * Tap an empty slot to open the picker; tap a filled slot to change it;
 * use the × to clear it. This is the on-page editor — the shareable PNG is
 * rendered separately by <NineGrid> for a clean, branded export.
 */
export default function FormationGrid({ slots, onSlotClick, onClearSlot }) {
  const { t } = useLanguage()
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
      {slots.map((member, i) => {
        const isCenter = i === CENTER_INDEX
        const filled = Boolean(member)
        return (
          <div key={i} className="relative">
            <button
              type="button"
              onClick={() => onSlotClick(i)}
              aria-label={
                filled
                  ? `${t('create.slot')} ${i + 1}: ${member.name}`
                  : `${t('create.slot')} ${i + 1} — ${t('create.emptySlot')}`
              }
              className="neo-border neo-press relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden"
              style={{
                backgroundColor: filled ? member.color : 'var(--neo-surface)',
                boxShadow: isCenter
                  ? '0 0 0 3px var(--color-neo-yellow), 4px 4px 0 0 var(--neo-shadow)'
                  : '4px 4px 0 0 var(--neo-shadow)',
              }}
            >
              {isCenter && (
                <span className="absolute left-1 top-1 z-10 bg-black px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white">
                  {t('create.center')}
                </span>
              )}
              {filled ? (
                <>
                  <MemberAvatar member={member} className="h-full w-full text-3xl sm:text-4xl" />
                  <span className="absolute inset-x-0 bottom-0 truncate border-t-[3px] border-black bg-white px-1 py-1 text-center font-display text-[11px] text-black sm:text-xs">
                    {member.name}
                  </span>
                </>
              ) : (
                <span className="flex flex-col items-center gap-1 opacity-50">
                  <Plus size={26} strokeWidth={3} />
                  <span className="font-display text-lg">{i + 1}</span>
                </span>
              )}
            </button>

            {filled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onClearSlot(i)
                }}
                aria-label={`${t('create.clearSlot')} ${i + 1}`}
                className="neo-border absolute -right-1.5 -top-1.5 z-20 flex h-7 w-7 items-center justify-center bg-neo-red text-black neo-press"
              >
                <X size={15} strokeWidth={3.5} />
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
