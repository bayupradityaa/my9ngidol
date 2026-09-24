import { Check } from 'lucide-react'
import { initials, getPhotoUrl, getTeamLabel } from '../data/members.js'

// Pick readable text color (black/white) for a given hex background.
export function readableOn(hex) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? '#000000' : '#ffffff'
}

export function MemberAvatar({ member, className = '', style }) {
  const fg = readableOn(member.color)
  return (
    <div
      className={`flex items-center justify-center font-display ${className}`}
      style={{ backgroundColor: member.color, color: fg, ...style }}
    >
      {member.photo ? (
        <img
          src={getPhotoUrl(member)}
          alt={member.name}
          className="h-full w-full object-cover"
          crossOrigin="anonymous"
        />
      ) : (
        <span>{initials(member.name)}</span>
      )}
    </div>
  )
}

export default function MemberCard({ member, selected, order, disabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(member)}
      disabled={disabled && !selected}
      aria-pressed={selected}
      className="neo-card neo-press relative flex w-full flex-col overflow-hidden text-left disabled:cursor-not-allowed disabled:opacity-40"
      style={selected ? { outline: '3px solid var(--neo-line)', outlineOffset: '2px' } : undefined}
    >
      {selected && (
        <span
          className="neo-border absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center bg-black text-sm font-bold text-white"
          aria-hidden="true"
        >
          {order}
        </span>
      )}
      <MemberAvatar member={member} className="aspect-square w-full text-4xl sm:text-5xl" />
      <div className="flex items-center justify-between gap-1 border-t-[3px] border-black px-2 py-2">
        <span className="truncate font-display text-sm">{member.name}</span>
        {selected ? (
          <Check size={16} strokeWidth={3} className="shrink-0" />
        ) : (
          <span className="shrink-0 truncate text-[10px] font-bold opacity-60">
            {getTeamLabel(member.team)}
          </span>
        )}
      </div>
    </button>
  )
}
