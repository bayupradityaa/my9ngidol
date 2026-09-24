export default function SectionHeading({ eyebrow, title, subtitle, eyebrowColor = '#FFEB3B', align = 'left' }) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {eyebrow && (
        <span
          className="neo-border neo-tag text-xs uppercase tracking-widest text-black"
          style={{ backgroundColor: eyebrowColor }}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="max-w-2xl text-base opacity-80 sm:text-lg">{subtitle}</p>}
    </div>
  )
}
