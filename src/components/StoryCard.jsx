import { forwardRef } from 'react'
import { MemberAvatar } from './MemberCard.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

// Instagram Story export canvas: fixed 1080x1920 (9:16), captured at scale 1.
// Hex-only inline styles keep the html2canvas render consistent (no oklch).
const LINE = '#000000'
export const STORY_W = 1080
export const STORY_H = 1920
const CENTER_INDEX = 4

const StoryCard = forwardRef(function StoryCard({ picks = [], title }, ref) {
  const { t } = useLanguage()
  const slots = Array.from({ length: 9 }, (_, i) => picks[i] || null)
  const heading = title || 'MY 9 NGIDOL'

  return (
    <div
      ref={ref}
      style={{
        width: `${STORY_W}px`,
        height: `${STORY_H}px`,
        backgroundColor: '#FFEB3B',
        border: `8px solid ${LINE}`,
        boxSizing: 'border-box',
        padding: '56px',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
        color: LINE,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '52px', letterSpacing: '-1px' }}>
          My 9 Ngidol
        </span>
        <span
          style={{
            backgroundColor: '#000',
            color: '#fff',
            fontWeight: 700,
            fontSize: '26px',
            padding: '10px 22px',
            border: `5px solid ${LINE}`,
          }}
        >
          {heading}
        </span>
      </div>

      {/* 3x3 grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '26px',
          flex: 1,
          marginTop: '44px',
          marginBottom: '44px',
          minHeight: 0,
        }}
      >
        {slots.map((m, i) => {
          const isCenter = i === CENTER_INDEX
          return (
            <div
              key={i}
              style={{
                backgroundColor: m ? m.color : '#ffffff',
                border: `6px solid ${LINE}`,
                boxShadow: isCenter ? `0 0 0 6px #FFEB3B, 10px 10px 0 0 ${LINE}` : `8px 8px 0 0 ${LINE}`,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                minHeight: 0,
              }}
            >
              {isCenter && (
                <span
                  style={{
                    position: 'absolute', top: '10px', left: '10px', zIndex: 2,
                    backgroundColor: '#000', color: '#fff', fontSize: '20px', fontWeight: 700,
                    padding: '5px 12px', letterSpacing: '1px',
                  }}
                >
                  {t('create.center')}
                </span>
              )}
              {m ? (
                <>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
                    <MemberAvatar
                      member={m}
                      style={{ width: '100%', height: '100%', fontSize: '84px' }}
                    />
                  </div>
                  <div
                    style={{
                      borderTop: `6px solid ${LINE}`, backgroundColor: '#fff', color: '#000',
                      fontFamily: '"Archivo Black", sans-serif', fontSize: '26px',
                      padding: '10px 12px', textAlign: 'center',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}
                  >
                    {m.name}
                  </div>
                </>
              ) : (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: '64px', fontWeight: 700 }}>
                  {i + 1}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '24px', fontWeight: 700 }}>
        <span>JKT48 • fan-made</span>
        <span>my9ngidol.pages.dev</span>
      </div>
    </div>
  )
})

export default StoryCard
