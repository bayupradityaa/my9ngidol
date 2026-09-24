import { Plus, X } from 'lucide-react'
import { MemberAvatar } from './MemberCard.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const CENTER_INDEX = 4

/**
 * Interactive 3x3 formation editor with tactile feedback.
 * Features micro-pop when filled, playful icon hover rotations, and clear affordance.
 */
export default function FormationGrid({ slots, onSlotClick, onClearSlot }) {
  const { t } = useLanguage()
  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
      {slots.map((member, i) => {
        const isCenter = i === CENTER_INDEX
        const filled = Boolean(member)
        return (
          <div key={i} className="relative group">
            <button
              type="button"
              onClick={() => onSlotClick(i)}
              aria-label={
                filled
                  ? `${t('create.slot')} ${i + 1}: ${member.name}`
                  : `${t('create.slot')} ${i + 1} — ${t('create.emptySlot')}`
              }
              className={`neo-border neo-press relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden transition-all duration-200 ${
                filled ? 'animate-in zoom-in-95' : 'hover:border-neo-blue'
              }`}
              style={{
                backgroundColor: filled ? member.color : 'var(--neo-surface)',
                boxShadow: isCenter
                  ? '0 0 0 3px var(--color-neo-yellow), 4px 4px 0 0 var(--neo-shadow)'
                  : '4px 4px 0 0 var(--neo-shadow)',
              }}
            >
              {isCenter && (
                <span className="absolute left-1 top-1 z-10 bg-black px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white shadow-[1px_1px_0_0_#fff]">
                  {t('create.center')}
                </span>
              )}
              {filled ? (
                <>
                  <div className="flex h-full w-full items-center justify-center transition-transform duration-200 group-hover:scale-105">
                    <MemberAvatar member={member} className="h-full w-full text-3xl sm:text-4xl" />
                  </div>
                  <span className="absolute inset-x-0 bottom-0 truncate border-t-[3px] border-black bg-white px-1 py-1 text-center font-display text-[11px] text-black sm:text-xs">
                    {member.name}
                  </span>
                </>
              ) : (
                <span className="flex flex-col items-center gap-1 opacity-50 transition-all duration-200 group-hover:opacity-100 group-hover:scale-105">
                  <Plus size={26} strokeWidth={3} className="transition-transform duration-200 group-hover:rotate-90 text-black dark:text-white" />
                  <span className="font-display text-lg text-black dark:text-white">{i + 1}</span>
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
                className="neo-border absolute -right-1.5 -top-1.5 z-20 flex h-7 w-7 items-center justify-center bg-neo-red text-black shadow-[2px_2px_0_0_#000] transition-transform duration-150 hover:scale-110 active:scale-90"
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
