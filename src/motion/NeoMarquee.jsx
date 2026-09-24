import { useReducedMotion } from './useReducedMotion.js'

/**
 * Editorial Neobrutalist ticker tape / marquee banner.
 * Uses hardware-accelerated infinite transform with hover-pause and reduced-motion fallback.
 */
export default function NeoMarquee({
  items = [
    '✦ MY 9 NGIDOL',
    '✦ JKT48 FAN-MADE',
    '✦ PICK YOUR 9 OSHI',
    '✦ INSTAGRAM STORY READY',
    '✦ 3x3 FORMATION',
    '✦ SHARE YOUR BIAS',
    '✦ NON-COMMERCIAL',
  ],
  speed = 28, // seconds for full cycle
  className = '',
  bg = 'bg-neo-yellow',
  textColor = 'text-black',
  border = 'border-y-[3px] border-black',
}) {
  const prefersReduced = useReducedMotion()

  const content = (
    <div className="flex shrink-0 items-center gap-6 pr-6">
      {items.map((item, idx) => (
        <span
          key={idx}
          className="font-display text-sm uppercase tracking-widest sm:text-base select-none whitespace-nowrap"
        >
          {item}
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={`group relative overflow-hidden py-2.5 ${bg} ${textColor} ${border} ${className}`}
      aria-hidden="true"
    >
      <div
        className={`flex w-max ${
          prefersReduced ? 'overflow-x-auto' : 'animate-marquee group-hover:[animation-play-state:paused]'
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {content}
        {!prefersReduced && content}
        {!prefersReduced && content}
      </div>
    </div>
  )
}
