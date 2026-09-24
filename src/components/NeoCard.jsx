export default function NeoCard({ children, className = '', color, style, ...props }) {
  const inlineStyle = color ? { backgroundColor: color, ...style } : style
  return (
    <div className={`neo-card ${className}`} style={inlineStyle} {...props}>
      {children}
    </div>
  )
}
