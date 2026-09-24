import { Link } from 'react-router-dom'

const VARIANTS = {
  yellow: 'bg-neo-yellow text-black',
  red: 'bg-neo-red text-black',
  blue: 'bg-neo-blue text-white',
  teal: 'bg-neo-teal text-black',
  coral: 'bg-neo-coral text-black',
  ink: 'bg-black text-white',
  surface: '', // uses .neo-btn defaults (themeable surface)
}

const SIZES = {
  sm: 'text-sm px-3 py-2',
  md: 'text-base',
  lg: 'text-lg px-6 py-3.5',
}

export default function NeoButton({
  children,
  variant = 'surface',
  size = 'md',
  to,
  href,
  className = '',
  ...props
}) {
  const classes = `neo-btn ${VARIANTS[variant] || ''} ${SIZES[size] || ''} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
