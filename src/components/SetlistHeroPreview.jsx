import { forwardRef } from 'react'
import { Disc3, Music2, Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const LINE = '#000000'
const CENTER_INDEX = 4

const SAMPLE_TRACKS = [
  { no: '01', title: 'Heavy Rotation', color: '#FF6B6B' },
  { no: '02', title: 'Pajama Drive', color: '#85E3FF' },
  { no: '03', title: 'Aturan Anti Cinta', color: '#FFDB58' },
  { no: '04', title: 'Matahari Milikku', color: '#A8E6CF' },
  { no: '05', title: 'Rapsodi', color: '#FFEB3B', isCenter: true },
  { no: '06', title: 'Bel Terakhir', color: '#FF8B94' },
  { no: '07', title: 'Saka Agari', color: '#85E3FF' },
  { no: '08', title: 'Tunas Seragam', color: '#B39DDB' },
  { no: '09', title: 'Cara Ceroboh', color: '#FFD3B6' },
]

const SetlistHeroPreview = forwardRef(function SetlistHeroPreview({ title }, ref) {
  const { t } = useLanguage()
  const heading = title || '9 SETLIST'

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: '#4ECDC4',
        border: `4px solid ${LINE}`,
        padding: '16px',
        width: '100%',
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
        color: LINE,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Disc3 size={20} strokeWidth={2.5} className="animate-spin text-black" style={{ animationDuration: '6s' }} />
          <span style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '20px', letterSpacing: '-0.5px' }}>
            My 9 Setlist
          </span>
        </div>
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
        {SAMPLE_TRACKS.map((track, i) => {
          const isCenter = i === CENTER_INDEX
          return (
            <div
              key={i}
              style={{
                backgroundColor: track.color,
                border: `3px solid ${LINE}`,
                boxShadow: isCenter ? `0 0 0 3px #4ECDC4, 5px 5px 0 0 ${LINE}` : `4px 4px 0 0 ${LINE}`,
                position: 'relative',
                aspectRatio: '1 / 1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '6px',
                overflow: 'hidden',
              }}
            >
              {/* Top slot badges */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    backgroundColor: '#000',
                    color: '#fff',
                    fontSize: '9px',
                    fontWeight: 700,
                    padding: '1px 4px',
                    border: `1.5px solid ${LINE}`,
                  }}
                >
                  {track.no}
                </span>
                {isCenter ? (
                  <Sparkles size={14} strokeWidth={3} className="text-black" />
                ) : (
                  <Music2 size={13} strokeWidth={2.5} className="text-black opacity-60" />
                )}
              </div>

              {/* Center icon / vinyl artwork */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto 0' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#000',
                    border: `2px solid ${LINE}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  <Disc3 size={16} strokeWidth={2.5} />
                </div>
              </div>

              {/* Bottom track title */}
              <div
                style={{
                  borderTop: `2px solid ${LINE}`,
                  backgroundColor: '#fff',
                  color: '#000',
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: '10px',
                  padding: '3px 4px',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {track.title}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', fontSize: '11px', fontWeight: 700 }}>
        <span>JKT48 • fan-made</span>
        <span style={{ textDecoration: 'underline' }}>Coming Soon</span>
      </div>
    </div>
  )
})

export default SetlistHeroPreview
