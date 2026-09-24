export default function NeoCard({
  children,
  className = '',
  color,
  interactive = false,
  style,
  ...props
}) {
  const inlineStyle = color ? { backgroundColor: color, ...style } : style
  const interactiveClass = interactive ? 'neo-card-hover' : ''
  return (
    <div
      className={`neo-card ${interactiveClass} ${className}`.trim()}
      style={inlineStyle}
      {...props}
    >
      {children}
    </div>
  )
}
