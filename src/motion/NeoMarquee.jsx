import { useReducedMotion } from './useReducedMotion.js'

/**
 * Editorial Neobrutalist ticker tape / marquee banner.
 * Uses hardware-accelerated infinite transform with hover-pause and reduced-motion fallback.
 */
export default function NeoMarquee({
  items = [
    '✦ Susun 9 Oshi Favoritmu',
    '✦ Tentukan Sang Center Impian',
    '✦ Pamerkan Formasi 3x3 ke Story-mu',
    '✦ 100% Fan-Made untuk Fandom JKT48',
    '✦ Mampir juga di receh48.web.id ↗',
  ],
  speed = 28, // seconds for full cycle
  className = '',
  bg = 'bg-neo-yellow',
  textColor = 'text-black',
  border = 'border-y-[3px] border-black',
}) {
  const prefersReduced = useReducedMotion()

  const renderItems = (prefix) => (
    <div className="flex shrink-0 items-center gap-6 pr-6">
      {items.map((item, idx) => (
        <span key={`${prefix}-${idx}`} className="flex items-center gap-6">
          <span className="font-display text-sm tracking-wide sm:text-base whitespace-nowrap">
            {item.includes('receh48.web.id') ? (
              <span>
                ✦ Mampir juga di{' '}
                <a
                  href="https://receh48.web.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-2 underline-offset-4 hover:opacity-75 transition-opacity pointer-events-auto"
                >
                  receh48.web.id ↗
                </a>
              </span>
            ) : (
              item
            )}
          </span>
          <span className="font-bold opacity-35 select-none" aria-hidden="true">
            |
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={`group relative overflow-hidden py-2.5 ${bg} ${textColor} ${border} ${className}`}
    >
      <div
        className={`flex w-max ${prefersReduced ? 'overflow-x-auto' : 'animate-marquee group-hover:[animation-play-state:paused]'
          }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {/* Two identical halves for a 100% seamless -50% loop */}
        <div className="flex shrink-0 items-center">
          {renderItems('a1')}
          {renderItems('a2')}
        </div>
        {!prefersReduced && (
          <div className="flex shrink-0 items-center">
            {renderItems('b1')}
            {renderItems('b2')}
          </div>
        )}
      </div>
    </div>
  )
}
