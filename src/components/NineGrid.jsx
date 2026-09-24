import { forwardRef } from 'react'
import { MemberAvatar, readableOn } from './MemberCard.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

// Fixed light styling (hex only) so the exported PNG is consistent and
// html2canvas-safe (no oklch/Tailwind-palette colors inside the capture node).
const LINE = '#000000'
const CENTER_INDEX = 4

const NineGrid = forwardRef(function NineGrid({ picks = [], title }, ref) {
  const { t } = useLanguage()
  const slots = Array.from({ length: 9 }, (_, i) => picks[i] || null)
  const heading = title || 'MY 9 OSHI'

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: '#FFEB3B',
        border: `4px solid ${LINE}`,
        padding: '16px',
        width: '100%',
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
        color: LINE,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '20px', letterSpacing: '-0.5px' }}>
          My 9 Ngidol
        </span>
        <span
          style={{
            backgroundColor: '#000',
            color: '#fff',
            fontWeight: 700,
            fontSize: '12px',
            padding: '4px 10px',
            border: `3px solid ${LINE}`,
          }}
        >
          {heading}
        </span>
      </div>

      {/* 3x3 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {slots.map((m, i) => {
          const isCenter = i === CENTER_INDEX
          return (
            <div
              key={i}
              style={{
                backgroundColor: m ? m.color : '#ffffff',
                border: `3px solid ${LINE}`,
                boxShadow: isCenter ? `0 0 0 3px #FFEB3B, 5px 5px 0 0 ${LINE}` : `4px 4px 0 0 ${LINE}`,
                position: 'relative',
                aspectRatio: '1 / 1',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {isCenter && (
                <span
                  style={{
                    position: 'absolute', top: '4px', left: '4px', zIndex: 2,
                    backgroundColor: '#000', color: '#fff', fontSize: '9px', fontWeight: 700,
                    padding: '2px 5px', letterSpacing: '0.5px',
                  }}
                >
                  {t('create.center')}
                </span>
              )}
              {m ? (
                <>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MemberAvatar
                      member={m}
                      style={{ width: '100%', height: '100%', fontSize: '30px' }}
                    />
                  </div>
                  <div
                    style={{
                      borderTop: `3px solid ${LINE}`, backgroundColor: '#fff', color: '#000',
                      fontFamily: '"Archivo Black", sans-serif', fontSize: '12px',
                      padding: '4px 6px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}
                  >
                    {m.name}
                  </div>
                </>
              ) : (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: '28px', fontWeight: 700 }}>
                  {i + 1}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', fontSize: '11px', fontWeight: 700 }}>
        <span>JKT48 • fan-made</span>
        <span>my9ngidol.pages.dev</span>
      </div>
    </div>
  )
})

export default NineGrid
